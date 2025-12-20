<template>
    <!--Chat Popup-->
  <div id="chat-popup" class="chat-popup">
    <div class="popup-inner">
      <div class="close-chat"><i class="fa fa-times"></i></div>
      <div class="chat-form">
        <p>Please fill out the form below and we will get back to you as soon as possible.</p>
        <form action="#" method="POST"
          class="contact-form-validated">
          <input type="hidden" name="_token" value="">

          <div class="form-group">
            <input type="text" name="name" placeholder="Your Name"  aria-required="true">
          </div>
          <div class="form-group">
            <input type="email" name="email" placeholder="Your Email"  aria-required="true">
          </div>
          <div class="form-group">
            <textarea name="message" placeholder="Your Text" aria-required="true"></textarea>
          </div>
          <div class="form-group message-btn">
            <button type="submit" class="thm-btn"> Submit Now
              <span><i class="icon-right-arrow"></i></span>
            </button>
          </div>
          <div class="result"></div>
        </form>
      </div>
    </div>
  </div>
</template>