<template>
    <div class="mobile-nav__wrapper">
        <div class="mobile-nav__overlay mobile-nav__toggler"></div>
        <!-- /.mobile-nav__overlay -->
        <div class="mobile-nav__content">
            <span class="mobile-nav__close mobile-nav__toggler"><i class="fa fa-times"></i></span>
            <div class="logo-box">
                <a href="index.php" aria-label="logo image"><img
                        src="https://dreamlayout.mnsithub.com/php/tanspotphp/assets/images/resources/logo-3.png"
                        width="140" alt=""></a>
            </div>
            <!-- /.logo-box -->
            <div class="mobile-nav__container">
                <ul class="main-menu__list">
                    <li class="current">
                        <a href="#">Home</a>
                    </li>
                    <li>
                        <a href="#">About</a>
                    </li>
                    <li class="dropdown">
                        <a href="#">Pages<button aria-label="dropdown toggler"><i
                                    class="fa fa-angle-down"></i></button></a>
                        <ul class="shadow-box">
                            <li><a href="team.php">Team</a></li>
                            <li><a href="team-details.php">Team Details</a></li>
                            <li><a href="projects.php">Projects</a></li>
                            <li><a href="project-details.php">Project Details</a></li>
                            <li><a href="testimonials.php">Testimonials</a></li>
                            <li><a href="pricing.php">Pricing</a></li>
                            <li><a href="faq.php">FAQs</a></li>
                            <li><a href="404.php">404 Error</a></li>
                        </ul>
                    </li>
                    <li class="dropdown">
                        <a href="#">Services<button aria-label="dropdown toggler"><i
                                    class="fa fa-angle-down"></i></button></a>
                        <ul class="shadow-box">
                            <li><a href="services.php">Services</a></li>
                            <li><a href="international-transport.php">International Transport</a></li>
                            <li><a href="track-transport.php">Local Track Transport</a></li>
                            <li><a href="personal-delivery.php">Fast Personal Delivery</a></li>
                            <li><a href="ocean-transport.php">Safe Ocean Transport</a></li>
                            <li><a href="warehouse-facility.php">Warehouse Facility</a></li>
                            <li><a href="emergency-transport.php">Emergency Transport</a></li>
                        </ul>
                    </li>
                    <li class="dropdown">
                        <a href="#">Shop<button aria-label="dropdown toggler"><i
                                    class="fa fa-angle-down"></i></button></a>
                        <ul class="shadow-box">
                            <li><a href="#">Products</a></li>
                            <li><a href="#">Product Details</a></li>
                            <li><a href="#">Cart</a></li>
                            <li><a href="checkout.php">Checkout</a></li>
                            <li><a href="wishlist.php">Wishlist</a></li>
                            <li><a href="sign-up.php">Sign Up</a></li>
                            <li><a href="login.php">Login</a></li>
                        </ul>
                    </li>
                    <li class="dropdown">
                        <a href="#">Blog<button aria-label="dropdown toggler"><i
                                    class="fa fa-angle-down"></i></button></a>
                        <ul class="shadow-box">
                            <li><a href="blog.php">Blog</a></li>
                            <li><a href="blog-standard.php">Blog Standard</a></li>
                            <li><a href="blog-left-sidebar.php">Blog Left Sidebar</a></li>
                            <li><a href="blog-right-sidebar.php">Blog Right Sidebar</a></li>
                            <li><a href="blog-details.php">Blog Details</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="contact.php">Contact</a>
                    </li>
                </ul>
            </div>
            <!-- /.mobile-nav__container -->

            <ul class="mobile-nav__contact list-unstyled">
                <li>
                    <i class="fa fa-envelope"></i>
                    <a href="mailto:needhelp@packageName__.com">needhelp@Tanspot.com</a>
                </li>
                <li>
                    <i class="fas fa-phone"></i>
                    <a href="tel:666-888-0000">666 888 0000</a>
                </li>
            </ul><!-- /.mobile-nav__contact -->
            <div class="mobile-nav__top">
                <div class="mobile-nav__social">
                    <a href="#" class="fab fa-twitter"></a>
                    <a href="#" class="fab fa-facebook-square"></a>
                    <a href="#" class="fab fa-pinterest-p"></a>
                    <a href="#" class="fab fa-instagram"></a>
                </div><!-- /.mobile-nav__social -->
            </div><!-- /.mobile-nav__top -->

        </div>
        <!-- /.mobile-nav__content -->
    </div>
</template>