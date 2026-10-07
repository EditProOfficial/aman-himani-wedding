/* =========================================================
   AMAN & HIMANI
   INVITATION CARD BY EDIT PRO
   COMPLETE WEDDING INVITATION JAVASCRIPT
   SCRATCH REVEAL + CINEMATIC UNLOCK
========================================================= */


/* =========================================================
   GLOBAL STATE
========================================================= */

let musicStarted = false;

let scratchInitialized = false;

let scratchRevealed = false;


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        createParticles(
            "openingParticles",
            60,
            "gold-particle"
        );


        createParticles(
            "pageParticles",
            45,
            "page-particle"
        );


        setupImageFallbacks();

        setupMusic();

        setupCountdown();

        setupReplay();

    }
);


/* =========================================================
   PARTICLES
========================================================= */

function createParticles(
    containerId,
    amount,
    className
) {

    const container =
        document.getElementById(
            containerId
        );


    if (!container) {
        return;
    }


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );


        particle.className =
            className;


        const size =
            1.5 +
            Math.random() * 3;


        particle.style.width =
            size + "px";


        particle.style.height =
            size + "px";


        particle.style.left =
            Math.random() * 100 + "%";


        particle.style.top =
            Math.random() * 100 + "%";


        particle.style.animationDuration =
            (
                4 +
                Math.random() * 8
            ) + "s";


        particle.style.animationDelay =
            (
                Math.random() * 7
            ) + "s";


        container.appendChild(
            particle
        );

    }

}


/* =========================================================
   IMAGE FALLBACKS
========================================================= */

function setupImageFallbacks() {

    const ganeshImage =
        document.getElementById(
            "ganeshImage"
        );


    const ganeshFallback =
        document.getElementById(
            "ganeshFallback"
        );


    if (ganeshImage) {

        /*
           Already loaded check
        */

        if (
            ganeshImage.complete &&
            ganeshImage.naturalWidth > 0
        ) {

            ganeshImage.classList.add(
                "loaded"
            );


            if (ganeshFallback) {

                ganeshFallback.style.display =
                    "none";

            }

        }


        /*
           Normal load
        */

        ganeshImage.addEventListener(
            "load",
            function () {

                ganeshImage.classList.add(
                    "loaded"
                );


                if (ganeshFallback) {

                    ganeshFallback.style.display =
                        "none";

                }

            }
        );


        /*
           Image missing
        */

        ganeshImage.addEventListener(
            "error",
            function () {

                ganeshImage.style.display =
                    "none";


                if (ganeshFallback) {

                    ganeshFallback.style.display =
                        "flex";

                }

            }
        );

    }


    /* =====================================================
       COUPLE IMAGE
    ====================================================== */

    const couplePhoto =
        document.getElementById(
            "couplePhoto"
        );


    const photoPlaceholder =
        document.getElementById(
            "photoPlaceholder"
        );


    if (couplePhoto) {

        /*
           Already loaded
        */

        if (
            couplePhoto.complete &&
            couplePhoto.naturalWidth > 0
        ) {

            couplePhoto.style.display =
                "block";


            if (photoPlaceholder) {

                photoPlaceholder.style.display =
                    "none";

            }

        }


        /*
           Normal load
        */

        couplePhoto.addEventListener(
            "load",
            function () {

                couplePhoto.style.display =
                    "block";


                if (photoPlaceholder) {

                    photoPlaceholder.style.display =
                        "none";

                }

            }
        );


        /*
           Missing image
        */

        couplePhoto.addEventListener(
            "error",
            function () {

                couplePhoto.style.display =
                    "none";


                if (photoPlaceholder) {

                    photoPlaceholder.style.display =
                        "flex";

                }

            }
        );

    }

}


/* =========================================================
   ENTER OUR STORY
========================================================= */

window.enterOurStory =
    function () {

        const openingScreen =
            document.getElementById(
                "openingScreen"
            );


        const invitationPage =
            document.getElementById(
                "invitationPage"
            );


        if (
            !openingScreen ||
            !invitationPage
        ) {

            return;

        }


        /*
           Start music only after
           user interaction.
        */

        startMusic();


        /*
           Fade opening.
        */

        openingScreen.classList.add(
            "hide"
        );


        /*
           Show main invitation.
        */

        setTimeout(
            function () {

                openingScreen.style.display =
                    "none";


                invitationPage.style.display =
                    "block";


                invitationPage.classList.add(
                    "show"
                );


                window.scrollTo({
                    top: 0,
                    behavior: "instant"
                });


                /*
                   Let browser finish rendering
                   before calculating scratch canvas.
                */

                requestAnimationFrame(
                    function () {

                        requestAnimationFrame(
                            function () {

                                initializeScratchCard();

                            }
                        );

                    }
                );

            },
            1350
        );

    };


/* =========================================================
   MUSIC
========================================================= */

function setupMusic() {

    const music =
        document.getElementById(
            "weddingMusic"
        );


    const button =
        document.getElementById(
            "musicButton"
        );


    if (
        !music ||
        !button
    ) {

        return;

    }


    button.addEventListener(
        "click",
        function () {

            if (
                music.paused
            ) {

                startMusic();

            } else {

                pauseMusic();

            }

        }
    );


    music.addEventListener(
        "play",
        function () {

            button.classList.add(
                "playing"
            );

        }
    );


    music.addEventListener(
        "pause",
        function () {

            button.classList.remove(
                "playing"
            );

        }
    );

}


function startMusic() {

    const music =
        document.getElementById(
            "weddingMusic"
        );


    if (!music) {
        return;
    }


    music.volume =
        0.42;


    const playPromise =
        music.play();


    if (
        playPromise !== undefined
    ) {

        playPromise
            .then(
                function () {

                    musicStarted =
                        true;

                }
            )
            .catch(
                function () {

                    /*
                       Browser autoplay policy.
                       User can use music button.
                    */

                }
            );

    }

}


function pauseMusic() {

    const music =
        document.getElementById(
            "weddingMusic"
        );


    if (!music) {
        return;
    }


    music.pause();

}


/* =========================================================
   COUNTDOWN
========================================================= */

function setupCountdown() {

    /*
       Wedding date:
       25 November 2026

       Time is intentionally midnight
       because no wedding time was provided.
    */

    const targetDate =
        new Date(
            "2026-11-25T00:00:00"
        );


    function updateCountdown() {

        const now =
            new Date();


        const difference =
            targetDate - now;


        if (
            difference <= 0
        ) {

            setText(
                "days",
                "00"
            );


            setText(
                "hours",
                "00"
            );


            setText(
                "minutes",
                "00"
            );


            setText(
                "seconds",
                "00"
            );


            return;

        }


        const days =
            Math.floor(
                difference /
                (
                    1000 *
                    60 *
                    60 *
                    24
                )
            );


        const hours =
            Math.floor(
                (
                    difference %
                    (
                        1000 *
                        60 *
                        60 *
                        24
                    )
                ) /
                (
                    1000 *
                    60 *
                    60
                )
            );


        const minutes =
            Math.floor(
                (
                    difference %
                    (
                        1000 *
                        60 *
                        60
                    )
                ) /
                (
                    1000 *
                    60
                )
            );


        const seconds =
            Math.floor(
                (
                    difference %
                    (
                        1000 *
                        60
                    )
                ) /
                1000
            );


        setText(
            "days",
            String(days).padStart(
                2,
                "0"
            )
        );


        setText(
            "hours",
            String(hours).padStart(
                2,
                "0"
            )
        );


        setText(
            "minutes",
            String(minutes).padStart(
                2,
                "0"
            )
        );


        setText(
            "seconds",
            String(seconds).padStart(
                2,
                "0"
            )
        );

    }


    updateCountdown();


    setInterval(
        updateCountdown,
        1000
    );

}


function setText(
    elementId,
    value
) {

    const element =
        document.getElementById(
            elementId
        );


    if (element) {

        element.textContent =
            value;

    }

}


/* =========================================================
   SCRATCH INITIALIZATION
========================================================= */

function initializeScratchCard() {

    /*
       Already initialized?
       Reset instead.
    */

    if (
        scratchInitialized
    ) {

        resetScratchCard();

        return;

    }


    scratchInitialized =
        true;


    setupScratchCard();

}


/* =========================================================
   SCRATCH CARD
========================================================= */

function setupScratchCard() {

    const canvas =
        document.getElementById(
            "scratchCanvas"
        );


    const card =
        document.querySelector(
            ".scratch-card"
        );


    const progress =
        document.getElementById(
            "scratchProgress"
        );


    const revealedDate =
        document.getElementById(
            "revealedDate"
        );


    const overlayText =
        document.getElementById(
            "scratchOverlayContent"
        );


    if (
        !canvas ||
        !card
    ) {

        console.error(
            "Scratch card elements not found."
        );

        return;

    }


    const ctx =
        canvas.getContext(
            "2d",
            {
                willReadFrequently:
                    true
            }
        );


    if (!ctx) {

        console.error(
            "Canvas 2D context unavailable."
        );

        return;

    }


    let isDrawing =
        false;


    let lastPoint =
        null;


    let scratchAnimationFrame =
        null;


    /* =====================================================
       CANVAS SIZE
    ====================================================== */

    function resizeCanvas(
        preserve = false
    ) {

        const rect =
            card.getBoundingClientRect();


        /*
           Hidden card safety.
        */

        if (
            rect.width <= 0 ||
            rect.height <= 0
        ) {

            requestAnimationFrame(
                function () {

                    resizeCanvas(
                        preserve
                    );

                }
            );


            return;

        }


        const dpr =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );


        let oldCanvas =
            null;


        /*
           Preserve current scratch state
           when browser resizes.
        */

        if (
            preserve &&
            canvas.width > 0 &&
            canvas.height > 0
        ) {

            oldCanvas =
                document.createElement(
                    "canvas"
                );


            oldCanvas.width =
                canvas.width;


            oldCanvas.height =
                canvas.height;


            const oldCtx =
                oldCanvas.getContext(
                    "2d"
                );


            oldCtx.drawImage(
                canvas,
                0,
                0
            );

        }


        canvas.width =
            Math.round(
                rect.width * dpr
            );


        canvas.height =
            Math.round(
                rect.height * dpr
            );


        canvas.style.width =
            rect.width + "px";


        canvas.style.height =
            rect.height + "px";


        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );


        if (
            preserve &&
            oldCanvas
        ) {

            ctx.globalCompositeOperation =
                "copy";


            ctx.drawImage(
                oldCanvas,
                0,
                0,
                rect.width,
                rect.height
            );


            ctx.globalCompositeOperation =
                "source-over";

        } else {

            drawScratchSurface(
                rect.width,
                rect.height
            );

        }

    }


    /* =====================================================
       SCRATCH SURFACE
    ====================================================== */

    function drawScratchSurface(
        width,
        height
    ) {

        ctx.globalCompositeOperation =
            "source-over";


        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        /*
           Premium metallic gold gradient
        */

        const gradient =
            ctx.createLinearGradient(
                0,
                0,
                width,
                height
            );


        gradient.addColorStop(
            0,
            "#7d4c1d"
        );


        gradient.addColorStop(
            0.22,
            "#c6974a"
        );


        gradient.addColorStop(
            0.48,
            "#e1bd76"
        );


        gradient.addColorStop(
            0.70,
            "#b57c31"
        );


        gradient.addColorStop(
            1,
            "#754719"
        );


        ctx.fillStyle =
            gradient;


        ctx.fillRect(
            0,
            0,
            width,
            height
        );


        /*
           Fine diagonal texture.
        */

        ctx.strokeStyle =
            "rgba(255,247,219,0.18)";


        ctx.lineWidth =
            1;


        for (
            let x = -height;
            x < width + height;
            x += 18
        ) {

            ctx.beginPath();


            ctx.moveTo(
                x,
                0
            );


            ctx.lineTo(
                x + height,
                height
            );


            ctx.stroke();

        }


        /*
           Soft center glow.
        */

        const glow =
            ctx.createRadialGradient(
                width / 2,
                height / 2,
                10,
                width / 2,
                height / 2,
                width * 0.62
            );


        glow.addColorStop(
            0,
            "rgba(255,248,223,0.14)"
        );


        glow.addColorStop(
            1,
            "rgba(255,248,223,0)"
        );


        ctx.fillStyle =
            glow;


        ctx.fillRect(
            0,
            0,
            width,
            height
        );


        ctx.globalCompositeOperation =
            "source-over";

    }


    /* =====================================================
       POINTER POSITION
    ====================================================== */

    function getPointerPosition(
        event
    ) {

        const rect =
            canvas.getBoundingClientRect();


        return {

            x:
                event.clientX -
                rect.left,

            y:
                event.clientY -
                rect.top

        };

    }


    /* =====================================================
       START SCRATCH
    ====================================================== */

    function startScratch(
        event
    ) {

        if (
            scratchRevealed
        ) {

            return;

        }


        event.preventDefault();


        isDrawing =
            true;


        try {

            canvas.setPointerCapture(
                event.pointerId
            );

        } catch (error) {

            /*
               Safari fallback.
            */

        }


        lastPoint =
            getPointerPosition(
                event
            );


        eraseCircle(
            lastPoint.x,
            lastPoint.y
        );


        scheduleScratchCheck();

    }


    /* =====================================================
       MOVE SCRATCH
    ====================================================== */

    function moveScratch(
        event
    ) {

        if (
            !isDrawing ||
            scratchRevealed
        ) {

            return;

        }


        event.preventDefault();


        const currentPoint =
            getPointerPosition(
                event
            );


        if (
            lastPoint
        ) {

            eraseLine(
                lastPoint.x,
                lastPoint.y,
                currentPoint.x,
                currentPoint.y
            );

        } else {

            eraseCircle(
                currentPoint.x,
                currentPoint.y
            );

        }


        lastPoint =
            currentPoint;


        scheduleScratchCheck();

    }


    /* =====================================================
       STOP SCRATCH
    ====================================================== */

    function endScratch(
        event
    ) {

        isDrawing =
            false;


        lastPoint =
            null;


        if (
            event &&
            canvas.releasePointerCapture
        ) {

            try {

                if (
                    canvas.hasPointerCapture &&
                    canvas.hasPointerCapture(
                        event.pointerId
                    )
                ) {

                    canvas.releasePointerCapture(
                        event.pointerId
                    );

                }

            } catch (error) {

                /*
                   Ignore pointer capture errors.
                */

            }

        }

    }


    /* =====================================================
       ERASE CIRCLE
    ====================================================== */

    function eraseCircle(
        x,
        y
    ) {

        ctx.save();


        ctx.globalCompositeOperation =
            "destination-out";


        ctx.beginPath();


        ctx.arc(
            x,
            y,
            27,
            0,
            Math.PI * 2
        );


        ctx.fill();


        ctx.restore();

    }


    /* =====================================================
       ERASE LINE
    ====================================================== */

    function eraseLine(
        x1,
        y1,
        x2,
        y2
    ) {

        ctx.save();


        ctx.globalCompositeOperation =
            "destination-out";


        ctx.beginPath();


        ctx.moveTo(
            x1,
            y1
        );


        ctx.lineTo(
            x2,
            y2
        );


        ctx.lineWidth =
            54;


        ctx.lineCap =
            "round";


        ctx.lineJoin =
            "round";


        ctx.stroke();


        ctx.restore();

    }


    /* =====================================================
       SCRATCH PROGRESS
    ====================================================== */

    function scheduleScratchCheck() {

        if (
            scratchAnimationFrame
        ) {

            return;

        }


        scratchAnimationFrame =
            requestAnimationFrame(
                function () {

                    scratchAnimationFrame =
                        null;


                    checkScratchProgress();

                }
            );

    }


    function checkScratchProgress() {

        if (
            scratchRevealed
        ) {

            return;

        }


        const width =
            canvas.width;


        const height =
            canvas.height;


        if (
            width <= 0 ||
            height <= 0
        ) {

            return;

        }


        const pixels =
            ctx.getImageData(
                0,
                0,
                width,
                height
            ).data;


        let transparent =
            0;


        let samples =
            0;


        /*
           Sample every 96th alpha pixel
           for performance.
        */

        for (
            let i = 3;
            i < pixels.length;
            i += 96
        ) {

            samples++;


            if (
                pixels[i] < 80
            ) {

                transparent++;

            }

        }


        if (
            samples === 0
        ) {

            return;

        }


        const percentage =
            (
                transparent /
                samples
            ) * 100;


        if (
            percentage < 8
        ) {

            setScratchMessage(
                "Keep scratching… ✨"
            );


        } else if (
            percentage < 22
        ) {

            setScratchMessage(
                "You're revealing something special…"
            );


        } else if (
            percentage < 38
        ) {

            setScratchMessage(
                "Almost there… ❤️"
            );


        } else {

            setScratchMessage(
                "Our special day is revealed ❤️"
            );


            revealDate();

        }

    }


    function setScratchMessage(
        message
    ) {

        if (progress) {

            progress.textContent =
                message;

        }

    }


    /* =====================================================
       REVEAL DATE + UNLOCK EVERYTHING
    ====================================================== */

    function revealDate() {

        if (
            scratchRevealed
        ) {

            return;

        }


        scratchRevealed =
            true;


        isDrawing =
            false;


        lastPoint =
            null;


        /*
           Add cinematic state
        */

        const scratchSection =
            document.getElementById(
                "scratchSection"
            );


        if (
            scratchSection
        ) {

            scratchSection.classList.add(
                "scratch-complete"
            );

        }


        /*
           Hide scratch instruction
        */

        if (
            overlayText
        ) {

            overlayText.style.transition =
                "opacity 0.55s ease";


            overlayText.style.opacity =
                "0";

        }


        /*
           Fade the physical scratch layer.
        */

        canvas.style.transition =
            "opacity 0.9s ease";


        canvas.style.opacity =
            "0";


        /*
           Date reveal.
        */

        setTimeout(
            function () {

                if (
                    revealedDate
                ) {

                    revealedDate.classList.add(
                        "show"
                    );

                }

            },
            420
        );


        /*
           Golden particle explosion.
        */

        createRevealBurst();


        /*
           Unlock the sections below.
        */

        setTimeout(
            function () {

                unlockAfterScratch();

            },
            1550
        );

    }


    /* =====================================================
       POINTER EVENTS
    ====================================================== */

    canvas.addEventListener(
        "pointerdown",
        startScratch
    );


    canvas.addEventListener(
        "pointermove",
        moveScratch
    );


    canvas.addEventListener(
        "pointerup",
        endScratch
    );


    canvas.addEventListener(
        "pointercancel",
        endScratch
    );


    canvas.addEventListener(
        "pointerleave",
        function (event) {

            /*
               Keep pointer capture alive
               while dragging.
            */

            if (
                !canvas.hasPointerCapture ||
                !canvas.hasPointerCapture(
                    event.pointerId
                )
            ) {

                endScratch(
                    event
                );

            }

        }
    );


    /* =====================================================
       INITIALIZE CANVAS
    ====================================================== */

    resizeCanvas();


    /* =====================================================
       RESIZE OBSERVER
    ====================================================== */

    if (
        "ResizeObserver" in window
    ) {

        const resizeObserver =
            new ResizeObserver(
                function () {

                    if (
                        !scratchRevealed
                    ) {

                        resizeCanvas(
                            true
                        );

                    }

                }
            );


        resizeObserver.observe(
            card
        );

    } else {

        window.addEventListener(
            "resize",
            function () {

                if (
                    !scratchRevealed
                ) {

                    resizeCanvas(
                        true
                    );

                }

            }
        );

    }

}


/* =========================================================
   CINEMATIC GOLDEN BURST
========================================================= */

function createRevealBurst() {

    const scratchSection =
        document.getElementById(
            "scratchSection"
        );


    if (!scratchSection) {
        return;
    }


    const burst =
        document.createElement(
            "div"
        );


    burst.className =
        "reveal-burst";


    burst.setAttribute(
        "aria-hidden",
        "true"
    );


    /*
       Golden particles.
    */

    for (
        let i = 0;
        i < 34;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );


        particle.className =
            "burst-particle";


        const angle =
            Math.random() * 360;


        const distance =
            100 +
            Math.random() * 210;


        const delay =
            Math.random() * 0.18;


        const size =
            2 +
            Math.random() * 4;


        particle.style.setProperty(
            "--angle",
            angle + "deg"
        );


        particle.style.setProperty(
            "--distance",
            distance + "px"
        );


        particle.style.setProperty(
            "--delay",
            delay + "s"
        );


        particle.style.width =
            size + "px";


        particle.style.height =
            size + "px";


        burst.appendChild(
            particle
        );

    }


    scratchSection.appendChild(
        burst
    );


    /*
       Remove after animation.
    */

    setTimeout(
        function () {

            burst.remove();

        },
        2300
    );

}


/* =========================================================
   UNLOCK EVERYTHING BELOW SCRATCH
========================================================= */

function unlockAfterScratch() {

    const content =
        document.getElementById(
            "afterScratchContent"
        );


    if (!content) {
        return;
    }


    /*
       Make entire lower content visible.
    */

    content.classList.add(
        "show"
    );


    /*
       Keep user at the scratch reveal
       for a moment instead of jumping
       aggressively.
    */

    setTimeout(
        function () {

            const venueSection =
                document.getElementById(
                    "venueSection"
                );


            if (
                venueSection
            ) {

                /*
                   Very subtle scroll,
                   only when user is close
                   enough to the reveal.
                */

                const currentScroll =
                    window.scrollY;


                const sectionTop =
                    content.getBoundingClientRect()
                        .top +
                    window.scrollY;


                if (
                    sectionTop -
                    currentScroll
                    < 420
                ) {

                    window.scrollTo({
                        top:
                            sectionTop -
                            30,

                        behavior:
                            "smooth"
                    });

                }

            }

        },
        900
    );

}


/* =========================================================
   RESET SCRATCH
========================================================= */

function resetScratchCard() {

    const canvas =
        document.getElementById(
            "scratchCanvas"
        );


    const card =
        document.querySelector(
            ".scratch-card"
        );


    const progress =
        document.getElementById(
            "scratchProgress"
        );


    const revealedDate =
        document.getElementById(
            "revealedDate"
        );


    const overlayText =
        document.getElementById(
            "scratchOverlayContent"
        );


    const scratchSection =
        document.getElementById(
            "scratchSection"
        );


    const afterScratchContent =
        document.getElementById(
            "afterScratchContent"
        );


    if (
        !canvas ||
        !card
    ) {

        return;

    }


    /*
       Global reset.
    */

    scratchRevealed =
        false;


    /*
       Reset cinematic state.
    */

    if (
        scratchSection
    ) {

        scratchSection.classList.remove(
            "scratch-complete"
        );

    }


    /*
       Hide everything below scratch.
    */

    if (
        afterScratchContent
    ) {

        afterScratchContent.classList.remove(
            "show"
        );

    }


    /*
       Reset date.
    */

    if (
        revealedDate
    ) {

        revealedDate.classList.remove(
            "show"
        );

    }


    /*
       Reset progress text.
    */

    if (
        progress
    ) {

        progress.textContent =
            "Keep scratching… ✨";

    }


    /*
       Reset overlay.
    */

    if (
        overlayText
    ) {

        overlayText.style.opacity =
            "1";


        overlayText.style.transition =
            "none";

    }


    /*
       Reset canvas.
    */

    canvas.style.opacity =
        "1";


    canvas.style.transition =
        "none";


    /*
       Rebuild gold scratch surface
       after page is visible again.
    */

    requestAnimationFrame(
        function () {

            const rect =
                card.getBoundingClientRect();


            if (
                rect.width <= 0 ||
                rect.height <= 0
            ) {

                return;

            }


            const dpr =
                Math.min(
                    window.devicePixelRatio || 1,
                    2
                );


            canvas.width =
                Math.round(
                    rect.width * dpr
                );


            canvas.height =
                Math.round(
                    rect.height * dpr
                );


            canvas.style.width =
                rect.width + "px";


            canvas.style.height =
                rect.height + "px";


            const ctx =
                canvas.getContext(
                    "2d",
                    {
                        willReadFrequently:
                            true
                    }
                );


            if (!ctx) {
                return;
            }


            ctx.setTransform(
                dpr,
                0,
                0,
                dpr,
                0,
                0
            );


            drawResetScratchSurface(
                ctx,
                rect.width,
                rect.height
            );

        }
    );

}


/* =========================================================
   RESET SCRATCH SURFACE
========================================================= */

function drawResetScratchSurface(
    ctx,
    width,
    height
) {

    ctx.globalCompositeOperation =
        "source-over";


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            width,
            height
        );


    gradient.addColorStop(
        0,
        "#7d4c1d"
    );


    gradient.addColorStop(
        0.22,
        "#c6974a"
    );


    gradient.addColorStop(
        0.48,
        "#e1bd76"
    );


    gradient.addColorStop(
        0.70,
        "#b57c31"
    );


    gradient.addColorStop(
        1,
        "#754719"
    );


    ctx.fillStyle =
        gradient;


    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    ctx.strokeStyle =
        "rgba(255,247,219,0.18)";


    ctx.lineWidth =
        1;


    for (
        let x = -height;
        x < width + height;
        x += 18
    ) {

        ctx.beginPath();


        ctx.moveTo(
            x,
            0
        );


        ctx.lineTo(
            x + height,
            height
        );


        ctx.stroke();

    }


    const glow =
        ctx.createRadialGradient(
            width / 2,
            height / 2,
            10,
            width / 2,
            height / 2,
            width * 0.62
        );


    glow.addColorStop(
        0,
        "rgba(255,248,223,0.14)"
    );


    glow.addColorStop(
        1,
        "rgba(255,248,223,0)"
    );


    ctx.fillStyle =
        glow;


    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    ctx.globalCompositeOperation =
        "source-over";

}


/* =========================================================
   REPLAY INVITATION
========================================================= */

function setupReplay() {

    const replayButton =
        document.getElementById(
            "replayButton"
        );


    if (!replayButton) {
        return;
    }


    replayButton.addEventListener(
        "click",
        function () {

            const invitationPage =
                document.getElementById(
                    "invitationPage"
                );


            const openingScreen =
                document.getElementById(
                    "openingScreen"
                );


            if (
                !invitationPage ||
                !openingScreen
            ) {

                return;

            }


            /*
               Hide invitation.
            */

            invitationPage.classList.remove(
                "show"
            );


            invitationPage.style.display =
                "none";


            /*
               Show opening again.
            */

            openingScreen.style.display =
                "flex";


            /*
               Reset scroll position.
            */

            window.scrollTo({
                top: 0,
                behavior: "instant"
            });


            /*
               Small delay so
               transition works again.
            */

            setTimeout(
                function () {

                    openingScreen.classList.remove(
                        "hide"
                    );


                    /*
                       Reset scratch state.
                    */

                    resetScratchCard();

                },
                80
            );

        }
    );

}