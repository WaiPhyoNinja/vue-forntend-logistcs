<template>
    <section class="contact-page">
    <div class="container">
        <div class="contact-page__inner">
            <div class="row">
                <div class="col-xl-6">
                    <div class="contact-page__left">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4562.753041141002!2d-118.80123790098536!3d34.152323469614075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80e82469c2162619%3A0xba03efb7998eef6d!2sCostco+Wholesale!5e0!3m2!1sbn!2sbd!4v1562518641290!5m2!1sbn!2sbd" class="google-map__one" allowfullscreen=""></iframe>
                    </div>
                </div>
                <div class="col-xl-6">
                    <div class="contact-page__right">
                        <h3 class="contact-page__form-title">Get A Free Quote</h3>
                        <form class="contact-form-validated contact-page__form" action="assets/inc/sendemail.php" method="POST" novalidate="novalidate">
                            <input type="hidden" name="_token" value="578b156d585912bbdccb9d9fe80aba7fc17c28677411048933cd9ea38a422290">
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6">
                                    <div class="contact-page__input-box">
                                        <input type="text" name="name" placeholder="Your name" required="" aria-required="true">
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6">
                                    <div class="contact-page__input-box">
                                        <input type="email" name="email" placeholder="Your Email" required="" aria-required="true">
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6">
                                    <div class="contact-page__input-box">
                                        <input type="text" placeholder="Phone" name="phone" required="" aria-required="true">
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6">
                                    <div class="contact-page__input-box">
                                        <input type="text" placeholder="Subject" name="subject" required="" aria-required="true">
                                    </div>
                                </div>
                                <div class="col-xl-12">
                                    <div class="contact-page__input-box text-message-box">
                                        <textarea name="message" placeholder="Messege" required="" aria-required="true"></textarea>
                                    </div>
                                    <div class="contact-page__btn-box">
                                        <button type="submit" class="footer-widget__newsletter-btn thm-btn">Send
                                            A Message
                                            <span><i class="icon-right-arrow"></i></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="result"></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</template>