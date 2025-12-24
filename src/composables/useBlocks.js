import { ref } from 'vue';
import directus from '@/services/directus';
import { readItems } from '@directus/sdk';

export function useBlocks() {
  const blocks = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchPageBlocks = async (permalink) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await directus.request(
        readItems('pages', {
          fields: [
            '*',
            'blocks.id',
            'blocks.collection',
            'blocks.item.*'
          ],
          filter: { 
            permalink: { _eq: permalink },
            status: { _eq: 'published' }
          }
        })
      );

      if (response && response.length > 0) {
        const page = response[0];
        
        // Fetch full block data
        if (page.blocks && page.blocks.length > 0) {
          const blockPromises = page.blocks.map(async (block) => {
            // Skip if block or item is null/undefined
            if (!block || !block.item) {
              console.warn(`Skipping ${block?.collection || 'unknown'} block - item is null or deleted`);
              return null;
            }
            
            // Extract the item ID - it could be an object or a string
            const itemId = typeof block.item === 'object' && block.item !== null 
              ? block.item.id 
              : block.item;
            
            if (!itemId) {
              console.warn('Block has no valid item ID:', block);
              return null;
            }
            
            // Determine fields to fetch based on collection type
            let fields = ['*', 'translations.*'];
            
            // For block_branded, also fetch images with directus_files_id
            if (block.collection === 'block_branded') {
              fields = ['*', 'images.id', 'images.directus_files_id'];
            }
            
            // For block_processflow, fetch translations with content repeater
            if (block.collection === 'block_processflow') {
              fields = ['*', 'translations.*'];
            }
            
            // For block_services, fetch services with translations
            if (block.collection === 'block_services') {
              fields = ['*', 'translations.*', 'services.services_id.*', 'services.services_id.translations.*'];
            }
            const blockData = await directus.request(
              readItems(block.collection, {
                fields: fields,
                filter: { id: { _eq: itemId } }
              })
            );
        
            return {
              id: block.id,
              collection: block.collection,
              data: blockData && blockData.length > 0 ? blockData[0] : null
            };
          });

          const resolvedBlocks = await Promise.all(blockPromises);
          // Filter out null blocks
          blocks.value = resolvedBlocks.filter(block => block !== null);
        }

        return page;
      }

      return null;
    } catch (err) {
      console.error('Error fetching page blocks:', err);
      error.value = err;
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    blocks,
    loading,
    error,
    fetchPageBlocks
  };
}
