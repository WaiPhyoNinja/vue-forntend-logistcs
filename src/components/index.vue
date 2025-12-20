<script setup>
import { onMounted } from 'vue';
import Footer from '../layouts/Footer.vue';
import Header from '../layouts/Header.vue';
import Chat from './Chat.vue';
import MobileSlider from './MobileSlider.vue';
import ScrollToTop from './ScrollToTop.vue';
import SearchPopup from './SearchPopup.vue';
import SliderWidget from './SliderWidget.vue';

onMounted(() => {
  // Initialize Bootstrap dropdowns for language switcher
  if (window.bootstrap) {
    const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
    [...dropdownElementList].map(dropdownToggleEl => new window.bootstrap.Dropdown(dropdownToggleEl));
  }
});
</script>

<template>
    <div class="page-wrapper">
        <Header />

        <section class="banner-one">
            <div class="banner-one__pattern"
                style="background-image: url(https://dreamlayout.mnsithub.com/php/tanspotphp/assets/images/shapes/banner-ong-pattern.png);"></div>
            <div class="banner-one__img aos-init" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="0">
                <img src="https://dreamlayout.mnsithub.com/php/tanspotphp/assets/images/resources/banner-one-img-1.png" alt="">
            </div>
            <div class="banner-one__shape-3 float-bob-y">
                <img src="https://dreamlayout.mnsithub.com/php/tanspotphp/assets/images/shapes/banner-one-shape-3.png" alt="">
            </div>
            <div class="banner-one__line-shpae1"></div>
            <div class="banner-one__line-shpae2"></div>
            <div class="container">
                <div class="banner-one__inner">
                    <div class="banner-one__content-box">
                        <p class="banner-one__sub-title">Specialist In Modern Transportation</p>
                        <h2 class="banner-one__title">Modern Logistic <br>
                            <span class="typed-effect" id="type-1"
                                data-strings="Transport, Provider, Services">Prov</span><span
                                class="typed-cursor">|</span>
                        </h2>
                        <p class="banner-one__text">Logistic service provider company plays a pivotal role
                            in the global <br> supply chain ecosystem managing.</p>
                        <div class="banner-one__btn-and-review-box">
                            <div class="banner-one__btn-box">
                                <a href="about.php" class="thm-btn">Discover More
                                    <span><i class="icon-right-arrow"></i></span>
                                </a>
                            </div>
                            <div class="banner-one__review-box">
                                <ul class="clearfix">
                                    <li>
                                        <div class="img-box"><img
                                                src="https://dreamlayout.mnsithub.com/php/tanspotphp/assets/images/resources/banner-one-review-1-1.jpg" alt="#">
                                        </div>
                                    </li>
                                    <li>
                                        <div class="img-box"><img
                                                src="https://dreamlayout.mnsithub.com/php/tanspotphp/assets/images/resources/banner-one-review-1-2.jpg" alt="#">
                                        </div>
                                    </li>
                                    <li>
                                        <div class="img-box"><img
                                                src="https://dreamlayout.mnsithub.com/php/tanspotphp/assets/images/resources/banner-one-review-1-3.jpg" alt="#">
                                        </div>
                                    </li>
                                </ul>

                                <div class="text-box">
                                    <h2>Customer Satisfied</h2>
                                    <p>4.8 (15k Reviews)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <section class="about-one">
            <div class="container">
                <div class="row">
                    <div class="col-xl-6">
                        <div class="about-one__left wow slideInLeft" data-wow-delay="100ms" data-wow-duration="2500ms"
                            style="visibility: hidden; animation-duration: 2500ms; animation-delay: 100ms; animation-name: none;">
                            <div class="about-one__img-box">
                                <div class="about-one__img">
                                    <img src="https://dreamlayout.mnsithub.com/php/tanspotphp/assets/images/resources/about-one-img-1.jpg" alt="">
                                </div>
                                <div class="about-one__review-and-experience-box">
                                    <div class="about-one__review-box">
                                        <ul class="list-unstyled about-one__review-list">
                                            <li>
                                                <div class="about-one__review-img">
                                                    <img src="https://dreamlayout.mnsithub.com/php/tanspotphp/assets/images/resources/about-one-review-img-1-1.jpg"
                                                        alt="">
                                                </div>
                                            </li>
                                            <li>
                                                <div class="about-one__review-img">
                                                    <img src="https://dreamlayout.mnsithub.com/php/tanspotphp/assets/images/resources/about-one-review-img-1-2.jpg"
                                                        alt="">
                                                </div>
                                            </li>
                                            <li>
                                                <div class="about-one__review-img">
                                                    <img src="https://dreamlayout.mnsithub.com/php/tanspotphp/assets/images/resources/about-one-review-img-1-3.jpg"
                                                        alt="">
                                                </div>
                                            </li>
                                            <li>
                                                <div class="about-one__review-img">
                                                    <img src="https://dreamlayout.mnsithub.com/php/tanspotphp/assets/images/resources/about-one-review-img-1-4.jpg"
                                                        alt="">
                                                </div>
                                            </li>
                                        </ul>
                                        <div class="about-one__review-star">
                                            <span class="fas fa-star"></span>
                                            <span class="fas fa-star"></span>
                                            <span class="fas fa-star"></span>
                                            <span class="fas fa-star"></span>
                                            <span class="fas fa-star"></span>
                                        </div>
                                        <p class="about-one__review-text">Clients 4.8 (3,567 Reviews)</p>
                                    </div>
                                    <div class="about-one__experience-box">
                                        <div class="about-one__experience-count">
                                            <h3 class="odometer odometer-auto-theme" data-count="35">
                                                <div class="odometer-inside"><span class="odometer-digit"><span
                                                            class="odometer-digit-spacer">8</span><span
                                                            class="odometer-digit-inner"><span
                                                                class="odometer-ribbon"><span
                                                                    class="odometer-ribbon-inner"><span
                                                                        class="odometer-value">0</span></span></span></span></span>
                                                </div>
                                            </h3>
                                            <span>+</span>
                                        </div>
                                        <p class="about-one__experience-count-text">Years Of <br> Experience</p>
                                    </div>
                                    <div class="about-one__video-link">
                                        <a href="https://www.youtube.com/watch?v=Get7rqXYrbQ" class="video-popup">
                                            <div class="about-one__video-icon">
                                                <span class="fa fa-play"></span>
                                                <i class="ripple"></i>
                                            </div>
                                        </a>
                                        <h4 class="about-one__video-title">Watch Video</h4>
                                    </div>
                                </div>
                                <div class="about-one__circle-text">
                                    <div class="about-one__round-text-box">
                                        <div class="inner">
                                            <div class="about-one__curved-circle rotate-me"
                                                style="position: absolute; height: 175.434px;"><span class="char1"
                                                    style="position: absolute; left: 50%; margin-left: -0.416667em; transform: rotate(-170.501deg); transform-origin: center 7.33333em;">W</span><span
                                                    class="char2"
                                                    style="position: absolute; left: 50%; margin-left: -0.333333em; transform: rotate(-162.184deg); transform-origin: center 7.33333em;">E</span><span
                                                    class="char3"
                                                    style="position: absolute; left: 50%; margin-left: -0.291667em; transform: rotate(-155.253deg); transform-origin: center 7.33333em;">L</span><span
                                                    class="char4"
                                                    style="position: absolute; left: 50%; margin-left: -0.333333em; transform: rotate(-148.322deg); transform-origin: center 7.33333em;">C</span><span
                                                    class="char5"
                                                    style="position: absolute; left: 50%; margin-left: -0.375em; transform: rotate(-140.467deg); transform-origin: center 7.33333em;">O</span><span
                                                    class="char6"
                                                    style="position: absolute; left: 50%; margin-left: -0.416667em; transform: rotate(-131.688deg); transform-origin: center 7.33333em;">M</span><span
                                                    class="char7"
                                                    style="position: absolute; left: 50%; margin-left: -0.333333em; transform: rotate(-123.371deg); transform-origin: center 7.33333em;">E</span><span
                                                    class="char8"
                                                    style="position: absolute; left: 50%; margin-left: -0.208333em; transform: rotate(-117.364deg); transform-origin: center 7.33333em;">&nbsp;</span><span
                                                    class="char9"
                                                    style="position: absolute; left: 50%; margin-left: -0.333333em; transform: rotate(-111.819deg); transform-origin: center 7.33333em;">T</span><span
                                                    class="char10"
                                                    style="position: absolute; left: 50%; margin-left: -0.375em; transform: rotate(-104.426deg); transform-origin: center 7.33333em;">O</span><span
                                                    class="char11"
                                                    style="position: absolute; left: 50%; margin-left: -0.208333em; transform: rotate(-97.9573deg); transform-origin: center 7.33333em;">&nbsp;</span><span
                                                    class="char12"
                                                    style="position: absolute; left: 50%; margin-left: -0.375em; transform: rotate(-91.4884deg); transform-origin: center 7.33333em;">O</span><span
                                                    class="char13"
                                                    style="position: absolute; left: 50%; margin-left: -0.375em; transform: rotate(-83.1713deg); transform-origin: center 7.33333em;">U</span><span
                                                    class="char14"
                                                    style="position: absolute; left: 50%; margin-left: -0.333333em; transform: rotate(-75.3162deg); transform-origin: center 7.33333em;">R</span><span
                                                    class="char15"
                                                    style="position: absolute; left: 50%; margin-left: -0.208333em; transform: rotate(-69.3094deg); transform-origin: center 7.33333em;">&nbsp;</span><span
                                                    class="char16"
                                                    style="position: absolute; left: 50%; margin-left: -0.333333em; transform: rotate(-63.3026deg); transform-origin: center 7.33333em;">C</span><span
                                                    class="char17"
                                                    style="position: absolute; left: 50%; margin-left: -0.375em; transform: rotate(-55.4475deg); transform-origin: center 7.33333em;">O</span><span
                                                    class="char18"
                                                    style="position: absolute; left: 50%; margin-left: -0.416667em; transform: rotate(-46.6683deg); transform-origin: center 7.33333em;">M</span><span
                                                    class="char19"
                                                    style="position: absolute; left: 50%; margin-left: -0.333333em; transform: rotate(-38.3512deg); transform-origin: center 7.33333em;">P</span><span
                                                    class="char20"
                                                    style="position: absolute; left: 50%; margin-left: -0.375em; transform: rotate(-30.4961deg); transform-origin: center 7.33333em;">A</span><span
                                                    class="char21"
                                                    style="position: absolute; left: 50%; margin-left: -0.375em; transform: rotate(-22.179deg); transform-origin: center 7.33333em;">N</span><span
                                                    class="char22"
                                                    style="position: absolute; left: 50%; margin-left: -0.333333em; transform: rotate(-14.3239deg); transform-origin: center 7.33333em;">Y</span><span
                                                    class="char23"
                                                    style="position: absolute; left: 50%; margin-left: -0.208333em; transform: rotate(-8.31713deg); transform-origin: center 7.33333em;">&nbsp;</span><span
                                                    class="char24"
                                                    style="position: absolute; left: 50%; margin-left: -0.416667em; transform: rotate(-1.38619deg); transform-origin: center 7.33333em;">W</span><span
                                                    class="char25"
                                                    style="position: absolute; left: 50%; margin-left: -0.375em; transform: rotate(7.393deg); transform-origin: center 7.33333em;">O</span><span
                                                    class="char26"
                                                    style="position: absolute; left: 50%; margin-left: -0.333333em; transform: rotate(15.2481deg); transform-origin: center 7.33333em;">R</span><span
                                                    class="char27"
                                                    style="position: absolute; left: 50%; margin-left: -0.333333em; transform: rotate(22.6411deg); transform-origin: center 7.33333em;">K</span><span
                                                    class="char28"
                                                    style="position: absolute; left: 50%; margin-left: -0.166667em; transform: rotate(28.1858deg); transform-origin: center 7.33333em;">I</span><span
                                                    class="char29"
                                                    style="position: absolute; left: 50%; margin-left: -0.375em; transform: rotate(34.1926deg); transform-origin: center 7.33333em;">N</span><span
                                                    class="char30"
                                                    style="position: absolute; left: 50%; margin-left: -0.375em; transform: rotate(42.5098deg); transform-origin: center 7.33333em;">G</span><span
                                                    class="char31"
                                                    style="position: absolute; left: 50%; margin-left: -0.208333em; transform: rotate(48.9787deg); transform-origin: center 7.33333em;">&nbsp;</span><span
                                                    class="char32"
                                                    style="position: absolute; left: 50%; margin-left: -0.333333em; transform: rotate(54.9855deg); transform-origin: center 7.33333em;">P</span><span
                                                    class="char33"
                                                    style="position: absolute; left: 50%; margin-left: -0.375em; transform: rotate(62.8405deg); transform-origin: center 7.33333em;">o</span><span
                                                    class="char34"
                                                    style="position: absolute; left: 50%; margin-left: -0.333333em; transform: rotate(70.6956deg); transform-origin: center 7.33333em;">p</span><span
                                                    class="char35"
                                                    style="position: absolute; left: 50%; margin-left: -0.333333em; transform: rotate(78.0886deg); transform-origin: center 7.33333em;">e</span><span
                                                    class="char36"
                                                    style="position: absolute; left: 50%; margin-left: -0.333333em; transform: rotate(85.4816deg); transform-origin: center 7.33333em;">r</span><span
                                                    class="char37"
                                                    style="position: absolute; left: 50%; margin-left: -0.291667em; transform: rotate(91.9505deg); transform-origin: center 7.33333em;">l</span><span
                                                    class="char38"
                                                    style="position: absolute; left: 50%; margin-left: -0.333333em; transform: rotate(98.4194deg); transform-origin: center 7.33333em;">y</span><span
                                                    class="char39"
                                                    style="position: absolute; left: 50%; margin-left: -0.208333em; transform: rotate(104.426deg); transform-origin: center 7.33333em;">&nbsp;</span><span
                                                    class="char40"
                                                    style="position: absolute; left: 50%; margin-left: -0.333333em; transform: rotate(110.433deg); transform-origin: center 7.33333em;">S</span><span
                                                    class="char41"
                                                    style="position: absolute; left: 50%; margin-left: -0.166667em; transform: rotate(115.978deg); transform-origin: center 7.33333em;">I</span><span
                                                    class="char42"
                                                    style="position: absolute; left: 50%; margin-left: -0.375em; transform: rotate(121.985deg); transform-origin: center 7.33333em;">N</span><span
                                                    class="char43"
                                                    style="position: absolute; left: 50%; margin-left: -0.333333em; transform: rotate(129.84deg); transform-origin: center 7.33333em;">C</span><span
                                                    class="char44"
                                                    style="position: absolute; left: 50%; margin-left: -0.333333em; transform: rotate(137.233deg); transform-origin: center 7.33333em;">E</span><span
                                                    class="char45"
                                                    style="position: absolute; left: 50%; margin-left: -0.208333em; transform: rotate(143.239deg); transform-origin: center 7.33333em;">&nbsp;</span><span
                                                    class="char46"
                                                    style="position: absolute; left: 50%; margin-left: -0.333333em; transform: rotate(149.246deg); transform-origin: center 7.33333em;">2</span><span
                                                    class="char47"
                                                    style="position: absolute; left: 50%; margin-left: -0.333333em; transform: rotate(156.639deg); transform-origin: center 7.33333em;">0</span><span
                                                    class="char48"
                                                    style="position: absolute; left: 50%; margin-left: -0.333333em; transform: rotate(164.032deg); transform-origin: center 7.33333em;">0</span><span
                                                    class="char49"
                                                    style="position: absolute; left: 50%; margin-left: -0.333333em; transform: rotate(171.425deg); transform-origin: center 7.33333em;">2</span>
                                            </div>
                                        </div>
                                        <div class="overlay-icon-box">
                                            <a href="about.php"><i class="icon-plane"></i></a>
                                        </div>
                                    </div>
                                </div>
                                <div class="about-one__shape-1">
                                    <img src="https://dreamlayout.mnsithub.com/php/tanspotphp/assets/images/shapes/about-one-shape-1.png" alt="">
                                </div>
                                <div class="about-one__shape-2">
                                    <img src="https://dreamlayout.mnsithub.com/php/tanspotphp/assets/images/shapes/about-one-shape-2.png" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6">
                        <div class="about-one__right">
                            <div class="section-title text-left sec-title-animation animation-style2">
                                <div class="section-title__tagline-box">
                                    <span class="section-title__tagline-border"></span>
                                    <div class="section-title__shape-1">
                                        <i class="fas fa-plane"></i>
                                    </div>
                                    <h6 class="section-title__tagline">ABOUT US</h6>
                                    <span class="section-title__tagline-border"></span>
                                    <div class="section-title__shape-2">
                                        <i class="fas fa-plane"></i>
                                    </div>
                                </div>
                                <h3 class="section-title__title title-animation" style="perspective: 400px;">
                                    <div class="split-line"
                                        style="display: block; text-align: start; position: relative;">
                                        <div style="position:relative;display:inline-block;">
                                            <div
                                                style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                O</div>
                                            <div
                                                style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                u</div>
                                            <div
                                                style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                r</div>
                                        </div>
                                        <div style="position:relative;display:inline-block;">
                                            <div
                                                style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                E</div>
                                            <div
                                                style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                x</div>
                                            <div
                                                style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                p</div>
                                            <div
                                                style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                e</div>
                                            <div
                                                style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                r</div>
                                            <div
                                                style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                t</div>
                                            <div
                                                style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                i</div>
                                            <div
                                                style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                s</div>
                                            <div
                                                style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                e</div>
                                        </div>
                                        <div style="position:relative;display:inline-block;">
                                            <div
                                                style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                S</div>
                                            <div
                                                style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                t</div>
                                            <div
                                                style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                a</div>
                                            <div
                                                style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                n</div>
                                            <div
                                                style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                d</div>
                                            <div
                                                style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                s</div>
                                        </div>
                                        <div style="position:relative;display:inline-block;">
                                            <div
                                                style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                i</div>
                                            <div
                                                style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                n</div>
                                        </div>
                                    </div>
                                    <div class="split-line"
                                        style="display: block; text-align: start; position: relative;"><span>
                                            <div style="position:relative;display:inline-block;">
                                                <div
                                                    style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                    L</div>
                                                <div
                                                    style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                    o</div>
                                                <div
                                                    style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                    g</div>
                                                <div
                                                    style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                    i</div>
                                                <div
                                                    style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                    s</div>
                                                <div
                                                    style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                    t</div>
                                                <div
                                                    style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                    i</div>
                                                <div
                                                    style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                    c</div>
                                                <div
                                                    style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                    s</div>
                                            </div>
                                            <div style="position:relative;display:inline-block;">
                                                <div
                                                    style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                    S</div>
                                                <div
                                                    style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                    o</div>
                                                <div
                                                    style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                    l</div>
                                                <div
                                                    style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                    u</div>
                                                <div
                                                    style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                    t</div>
                                                <div
                                                    style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                    i</div>
                                                <div
                                                    style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                    o</div>
                                                <div
                                                    style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                    n</div>
                                                <div
                                                    style="position: relative; display: inline-block; transform: translate(50px, 0px); opacity: 0;">
                                                    s</div>
                                            </div>
                                        </span></div>
                                </h3>
                            </div>
                            <p class="about-one__text">Logistic service provider company plays a pivotal role in the
                                global supply chain ecosystem by efficiently managing the movement of goods from origin
                                to final destination. These companies offer a diverse.</p>
                            <div class="about-one__point-box">
                                <ul class="about-one__point">
                                    <li>
                                        <div class="about-one__point-icon">
                                            <span class="icon-worldwide-shipping-1"></span>
                                        </div>
                                        <div class="about-one__point-content">
                                            <h4>Worldwide Service</h4>
                                            <p>Logistic service provider company plays a pivotal role in the global</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="about-one__point-icon">
                                            <span class="icon-24-hours-service"></span>
                                        </div>
                                        <div class="about-one__point-content">
                                            <h4>24/7 Online Support</h4>
                                            <p>Logistic service provider company plays a pivotal role in the global</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="about-one__point-box-two">
                                <ul class="about-one__point-two">
                                    <li>
                                        <div class="icon">
                                            <span class="fas fa-check"></span>
                                        </div>
                                        <div class="text">
                                            <p>Quality Control System</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="icon">
                                            <span class="fas fa-check"></span>
                                        </div>
                                        <div class="text">
                                            <p>Affrodable Cost</p>
                                        </div>
                                    </li>
                                </ul>
                                <ul class="about-one__point-two about-one__point-two--three">
                                    <li>
                                        <div class="icon">
                                            <span class="fas fa-check"></span>
                                        </div>
                                        <div class="text">
                                            <p>100% Satisfaction Guarantee</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="icon">
                                            <span class="fas fa-check"></span>
                                        </div>
                                        <div class="text">
                                            <p>On Time Delivery</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="about-one__btn-and-author-box">
                                <div class="about-one__btn-box">
                                    <a href="about.php" class="thm-btn">Read More
                                        <span><i class="icon-right-arrow"></i></span>
                                    </a>
                                </div>
                                <div class="about-one__author-box">
                                    <div class="about-one__author-details">
                                        <div class="about-one__author-img-box">
                                            <div class="about-one__author-img">
                                                <img src="https://dreamlayout.mnsithub.com/php/tanspotphp/assets/images/resources/about-one-author-img-1.jpg" alt="">
                                            </div>
                                        </div>
                                        <div class="about-one__author-content">
                                            <h4>Dainel Brain</h4>
                                            <p>Co-Founder</p>
                                        </div>
                                    </div>
                                    <div class="about-one__author-sign">
                                        <img src="https://dreamlayout.mnsithub.com/php/tanspotphp/assets/images/resources/about-one-author-sign.png" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    
        <Footer />
    </div>
    <Chat />
    <MobileSlider />
    <SearchPopup />
    <ScrollToTop />
    <SliderWidget />
</template>

<style scoped>
/* All styles are loaded from the main CSS files */
</style>
