/* =========================================
   GYM FIT - COMPLETE JAVASCRIPT
   Powered by Aryan
========================================= */


/* =========================================================
   DATA
========================================================= */

let completedDays =
    JSON.parse(
        localStorage.getItem("gymFitCompletedDays")
    ) || [];

let workoutCount =
    Number(
        localStorage.getItem("gymFitWorkoutCount")
    ) || 0;

let streak =
    Number(
        localStorage.getItem("gymFitStreak")
    ) || 1;

let waterCount =
    Number(
        localStorage.getItem("gymFitWater")
    ) || 0;

let runTimer = null;
let runSeconds = 0;


/* =========================================================
   LOGIN / PROFILE
========================================================= */

const isLoggedIn =
    localStorage.getItem("gymFitLoggedIn") === "true";

const profileComplete =
    localStorage.getItem("gymFitProfileComplete") === "true";


/* =========================================================
   INITIAL APP START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        createDays();

        updateProgress();

        updateWater();

        updateChallengeUI();

        loadProfileUI();

        initializeEntryFlow();

    }
);


/* =========================================================
   ENTRY FLOW
========================================================= */

function initializeEntryFlow() {

    const splash =
        document.getElementById("splashScreen");

    const auth =
        document.getElementById("authScreen");

    const profile =
        document.getElementById("profileSetup");


    if (!splash) {
        return;
    }


    /*
       New user:
       Splash -> Login
    */

    if (!isLoggedIn) {

        setTimeout(
            function () {

                splash.classList.add("hide");

                if (auth) {
                    auth.classList.remove("hidden");
                }

            },
            1800
        );

        return;
    }


    /*
       Logged in but profile incomplete:
       Splash -> Profile popup
    */

    if (!profileComplete) {

        setTimeout(
            function () {

                splash.classList.add("hide");

                if (profile) {
                    profile.classList.remove("hidden");
                }

            },
            1200
        );

        return;
    }


    /*
       Already logged in + profile complete:
       Splash -> Home
    */

    setTimeout(
        function () {

            splash.classList.add("hide");

            updateUserName();

        },
        1000
    );

}


/* =========================================================
   LOGIN
========================================================= */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("loginName")
                    .value
                    .trim();

            const email =
                document
                    .getElementById("loginEmail")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("loginPassword")
                    .value;


            if (!name || !email || !password) {

                alert(
                    "Please fill all details."
                );

                return;
            }


            if (password.length < 6) {

                alert(
                    "Password must be at least 6 characters."
                );

                return;
            }


            /*
               Demo/local login.
               Real authentication can be added later
               using a backend/Firebase.
            */

            localStorage.setItem(
                "gymFitLoggedIn",
                "true"
            );

            localStorage.setItem(
                "gymFitUserName",
                name
            );

            localStorage.setItem(
                "gymFitUserEmail",
                email
            );


            const auth =
                document.getElementById("authScreen");

            const profile =
                document.getElementById("profileSetup");


            if (auth) {
                auth.classList.add("hidden");
            }


            if (profile) {
                profile.classList.remove("hidden");
            }

        }
    );

}


/* =========================================================
   GENDER
========================================================= */

const genderCards =
    document.querySelectorAll(
        ".gender-card"
    );


genderCards.forEach(
    function (card) {

        card.addEventListener(
            "click",
            function () {

                genderCards.forEach(
                    function (item) {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );


                card.classList.add(
                    "selected"
                );


                const gender =
                    card.getAttribute(
                        "data-gender"
                    );


                document.getElementById(
                    "genderInput"
                ).value = gender;

            }
        );

    }
);


/* =========================================================
   GOAL
========================================================= */

const goalCards =
    document.querySelectorAll(
        ".goal-card"
    );


goalCards.forEach(
    function (card) {

        card.addEventListener(
            "click",
            function () {

                goalCards.forEach(
                    function (item) {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );


                card.classList.add(
                    "selected"
                );


                const goal =
                    card.getAttribute(
                        "data-goal"
                    );


                document.getElementById(
                    "goalInput"
                ).value = goal;

            }
        );

    }
);


/* =========================================================
   SAVE PROFILE
========================================================= */

const saveProfileBtn =
    document.getElementById(
        "saveProfileBtn"
    );


if (saveProfileBtn) {

    saveProfileBtn.addEventListener(
        "click",
        function () {

            const gender =
                document.getElementById(
                    "genderInput"
                ).value;

            const age =
                document.getElementById(
                    "ageInput"
                ).value;

            const height =
                document.getElementById(
                    "heightInput"
                ).value;

            const weight =
                document.getElementById(
                    "weightInput"
                ).value;

            const goal =
                document.getElementById(
                    "goalInput"
                ).value;


            /* ---------- VALIDATION ---------- */

            if (!gender) {

                alert(
                    "Please select your gender."
                );

                return;
            }


            if (!age) {

                alert(
                    "Please enter your age."
                );

                return;
            }


            if (
                Number(age) < 10 ||
                Number(age) > 100
            ) {

                alert(
                    "Please enter a valid age."
                );

                return;
            }


            if (!height) {

                alert(
                    "Please enter your height."
                );

                return;
            }


            if (
                Number(height) < 100 ||
                Number(height) > 250
            ) {

                alert(
                    "Please enter a valid height."
                );

                return;
            }


            if (!weight) {

                alert(
                    "Please enter your weight."
                );

                return;
            }


            if (
                Number(weight) < 25 ||
                Number(weight) > 300
            ) {

                alert(
                    "Please enter a valid weight."
                );

                return;
            }


            if (!goal) {

                alert(
                    "Please select your fitness goal."
                );

                return;
            }


            /* ---------- SAVE ---------- */

            localStorage.setItem(
                "gymFitGender",
                gender
            );

            localStorage.setItem(
                "gymFitAge",
                age
            );

            localStorage.setItem(
                "gymFitHeight",
                height
            );

            localStorage.setItem(
                "gymFitWeight",
                weight
            );

            localStorage.setItem(
                "gymFitGoal",
                goal
            );

            localStorage.setItem(
                "gymFitProfileComplete",
                "true"
            );


            /* ---------- CLOSE ---------- */

            const profile =
                document.getElementById(
                    "profileSetup"
                );


            if (profile) {
                profile.classList.add(
                    "hidden"
                );
            }


            updateProfilePage();

            updateUserName();


            const userName =
                localStorage.getItem(
                    "gymFitUserName"
                ) || "Athlete";


            alert(
                "🔥 Welcome to GYM FIT, " +
                userName +
                "!"
            );

        }
    );

}


/* =========================================================
   USER NAME
========================================================= */

function updateUserName() {

    const name =
        localStorage.getItem(
            "gymFitUserName"
        );


    const hello =
        document.getElementById(
            "helloText"
        );


    if (hello && name) {

        hello.innerText =
            "Welcome back, " +
            name +
            " 💪";

    }


    const profileName =
        document.getElementById(
            "profileName"
        );


    if (profileName && name) {

        profileName.innerText =
            name;

    }

}


/* =========================================================
   PROFILE UI
========================================================= */

function loadProfileUI() {

    updateProfilePage();

    updateUserName();

}


function updateProfilePage() {

    const gender =
        localStorage.getItem(
            "gymFitGender"
        );

    const age =
        localStorage.getItem(
            "gymFitAge"
        );

    const height =
        localStorage.getItem(
            "gymFitHeight"
        );

    const weight =
        localStorage.getItem(
            "gymFitWeight"
        );

    const goal =
        localStorage.getItem(
            "gymFitGoal"
        );


    const profileGoal =
        document.getElementById(
            "profileGoal"
        );


    if (profileGoal && goal) {
        profileGoal.innerText = goal;
    }


    const profileStats =
        document.getElementById(
            "profileStats"
        );


    if (
        profileStats &&
        height &&
        weight
    ) {

        profileStats.innerText =
            height +
            " cm • " +
            weight +
            " kg";

    }


    const genderAge =
        document.getElementById(
            "profileGenderAge"
        );


    if (
        genderAge &&
        gender &&
        age
    ) {

        genderAge.innerText =
            gender +
            " • " +
            age +
            " years";

    }


    const goalText =
        document.getElementById(
            "profileGoalText"
        );


    if (goalText && goal) {

        goalText.innerText =
            goal +
            " • Keep pushing forward.";

    }


    const avatar =
        document.getElementById(
            "profileAvatar"
        );


    if (avatar && gender) {

        avatar.innerText =
            gender === "Female"
                ? "👩"
                : "👨";

    }

}


/* =========================================================
   LOGOUT
========================================================= */

function logoutGymFit() {

    const confirmLogout =
        confirm(
            "Logout from GYM FIT?"
        );


    if (!confirmLogout) {
        return;
    }


    localStorage.removeItem(
        "gymFitLoggedIn"
    );

    localStorage.removeItem(
        "gymFitUserName"
    );

    localStorage.removeItem(
        "gymFitUserEmail"
    );

    localStorage.removeItem(
        "gymFitProfileComplete"
    );

    localStorage.removeItem(
        "gymFitGender"
    );

    localStorage.removeItem(
        "gymFitAge"
    );

    localStorage.removeItem(
        "gymFitHeight"
    );

    localStorage.removeItem(
        "gymFitWeight"
    );

    localStorage.removeItem(
        "gymFitGoal"
    );


    location.reload();

}


/* =========================================================
   PAGE NAVIGATION
========================================================= */

function showPage(
    pageId,
    button = null
) {

    const pages =
        document.querySelectorAll(
            ".page"
        );


    pages.forEach(
        function (page) {

            page.classList.remove(
                "active"
            );

        }
    );


    const selectedPage =
        document.getElementById(
            pageId
        );


    if (selectedPage) {

        selectedPage.classList.add(
            "active"
        );

    }


    const navButtons =
        document.querySelectorAll(
            ".nav-item"
        );


    navButtons.forEach(
        function (btn) {

            btn.classList.remove(
                "active"
            );

        }
    );


    if (button) {

        button.classList.add(
            "active"
        );

    } else {

        navButtons.forEach(
            function (btn) {

                const text =
                    btn.innerText
                        .toLowerCase();


                if (
                    (pageId === "home" &&
                        text.includes("home")) ||

                    (pageId === "workout" &&
                        text.includes("workout")) ||

                    (pageId === "running" &&
                        text.includes("run")) ||

                    (pageId === "challenge" &&
                        text.includes("challenge")) ||

                    (pageId === "progress" &&
                        text.includes("progress"))
                ) {

                    btn.classList.add(
                        "active"
                    );

                }

            }
        );

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    updateProgress();

    updateChallengeUI();

}


/* =========================================================
   WORKOUT LEVEL
========================================================= */

function selectLevel(level) {

    localStorage.setItem(
        "gymFitLevel",
        level
    );


    alert(
        "💪 " +
        level +
        " level selected!\n\n" +
        "Your workout plan is ready."
    );

}


/* =========================================================
   COMPLETE WORKOUT
========================================================= */

function completeWorkout() {

    workoutCount++;


    localStorage.setItem(
        "gymFitWorkoutCount",
        workoutCount
    );


    updateProgress();


    alert(
        "🔥 Workout Completed!\n\n" +
        "Great job! Keep going."
    );

}


/* =========================================================
   RUNNING
========================================================= */

function startRun() {

    if (runTimer) {

        return;

    }


    runSeconds = 0;


    const button =
        document.getElementById(
            "runButton"
        );


    if (button) {

        button.innerText =
            "RUNNING...";

    }


    runTimer =
        setInterval(
            function () {

                runSeconds++;


                const minutes =
                    Math.floor(
                        runSeconds / 60
                    );


                const seconds =
                    runSeconds % 60;


                const timeText =
                    String(minutes)
                        .padStart(2, "0") +
                    ":" +
                    String(seconds)
                        .padStart(2, "0");


                const time =
                    document.getElementById(
                        "runTime"
                    );


                if (time) {

                    time.innerText =
                        timeText;

                }


                const pace =
                    document.getElementById(
                        "runPace"
                    );


                if (pace) {

                    const paceMinutes =
                        Math.floor(
                            runSeconds / 96
                        );

                    const paceSeconds =
                        Math.floor(
                            runSeconds % 96
                        );


                    pace.innerText =
                        String(paceMinutes)
                            .padStart(2, "0") +
                        ":" +
                        String(paceSeconds)
                            .padStart(2, "0");

                }

            },
            1000
        );


    alert(
        "🏃 Run started!\n\n" +
        "Target: 1.6 KM"
    );

}


/* =========================================================
   CREATE 30 DAYS
========================================================= */

function createDays() {

    const grid =
        document.getElementById(
            "dayGrid"
        );


    if (!grid) {

        return;

    }


    grid.innerHTML = "";


    for (
        let day = 1;
        day <= 30;
        day++
    ) {

        const dayBox =
            document.createElement(
                "div"
            );


        dayBox.className =
            "day";


        dayBox.innerText =
            day;


        if (
            completedDays.includes(day)
        ) {

            dayBox.classList.add(
                "completed"
            );

            dayBox.innerText =
                "✓ " + day;

        }


        if (
            day > 1 &&
            !completedDays.includes(
                day - 1
            ) &&
            !completedDays.includes(day)
        ) {

            dayBox.classList.add(
                "locked"
            );

            dayBox.innerText =
                "🔒 " + day;

        }


        dayBox.addEventListener(
            "click",
            function () {

                if (
                    day > 1 &&
                    !completedDays.includes(
                        day - 1
                    )
                ) {

                    alert(
                        "🔒 Day " +
                        day +
                        " is locked.\n\n" +
                        "Complete Day " +
                        (day - 1) +
                        " first."
                    );

                    return;

                }


                if (
                    completedDays.includes(day)
                ) {

                    alert(
                        "✅ Day " +
                        day +
                        " is already completed!"
                    );

                    return;

                }


                showDayDetails(day);

            }
        );


        grid.appendChild(dayBox);

    }

}


/* =========================================================
   DAY DETAILS
========================================================= */

function showDayDetails(day) {

    alert(
        "🔥 DAY " +
        day +
        " CHALLENGE\n\n" +

        "🏃 Run: 1.6 KM\n" +

        "💪 Push Ups: " +
        getPushups(day) +
        "\n" +

        "🦵 Squats: " +
        getSquats(day) +
        "\n" +

        "🏋️ Pull Ups: " +
        getPullups(day) +
        "\n\n" +

        "Complete all exercises,\n" +
        "then press COMPLETE DAY."
    );

}


/* =========================================================
   CHALLENGE REP CALCULATOR
========================================================= */

function getPushups(day) {

    if (day === 1) {
        return 20;
    }

    if (day === 2) {
        return 35;
    }

    if (day === 3) {
        return 50;
    }

    return 50 + (
        (day - 3) * 5
    );

}


function getSquats(day) {

    if (day === 1) {
        return 20;
    }

    if (day === 2) {
        return 35;
    }

    if (day === 3) {
        return 50;
    }

    return 50 + (
        (day - 3) * 5
    );

}


function getPullups(day) {

    if (day === 1) {
        return 5;
    }

    if (day === 2) {
        return 8;
    }

    if (day === 3) {
        return 10;
    }

    return 10 + Math.floor(
        (day - 3) / 2
    );

}


/* =========================================================
   UPDATE CHALLENGE UI
========================================================= */

function updateChallengeUI() {

    let nextDay = 1;


    while (
        completedDays.includes(nextDay) &&
        nextDay <= 30
    ) {

        nextDay++;

    }


    if (nextDay > 30) {

        nextDay = 30;

    }


    const title =
        document.getElementById(
            "challengeDayTitle"
        );


    if (title) {

        title.innerText =
            "Day " + nextDay;

    }


    const pushups =
        document.getElementById(
            "challengePushups"
        );


    if (pushups) {

        pushups.innerText =
            getPushups(nextDay);

    }


    const squats =
        document.getElementById(
            "challengeSquats"
        );


    if (squats) {

        squats.innerText =
            getSquats(nextDay);

    }


    const pullups =
        document.getElementById(
            "challengePullups"
        );


    if (pullups) {

        pullups.innerText =
            getPullups(nextDay);

    }


    const completeButton =
        document.getElementById(
            "completeChallengeBtn"
        );


    if (completeButton) {

        if (completedDays.length >= 30) {

            completeButton.innerText =
                "🏆 30 DAYS COMPLETED";

            completeButton.disabled =
                true;

        } else {

            completeButton.innerText =
                "✓ COMPLETE DAY " +
                nextDay;

            completeButton.disabled =
                false;

        }

    }


    const homeDay =
        document.getElementById(
            "homeChallengeDay"
        );


    if (homeDay) {

        homeDay.innerText =
            String(nextDay)
                .padStart(2, "0");

    }

}


/* =========================================================
   COMPLETE CHALLENGE
========================================================= */

function completeChallenge() {

    let nextDay = 1;


    while (
        completedDays.includes(nextDay) &&
        nextDay <= 30
    ) {

        nextDay++;

    }


    if (nextDay > 30) {

        alert(
            "🏆 Congratulations!\n\n" +
            "You completed all 30 days!"
        );

        return;

    }


    if (nextDay > 1) {

        const previous =
            nextDay - 1;


        if (
            !completedDays.includes(
                previous
            )
        ) {

            alert(
                "🔒 Complete Day " +
                previous +
                " first."
            );

            return;

        }

    }


    const confirmComplete =
        confirm(
            "Complete Day " +
            nextDay +
            "?\n\n" +

            "🏃 1.6 KM Run\n" +

            "💪 Push Ups: " +
            getPushups(nextDay) +
            "\n" +

            "🦵 Squats: " +
            getSquats(nextDay) +
            "\n" +

            "🏋️ Pull Ups: " +
            getPullups(nextDay)
        );


    if (!confirmComplete) {

        return;

    }


    completedDays.push(
        nextDay
    );


    localStorage.setItem(
        "gymFitCompletedDays",
        JSON.stringify(
            completedDays
        )
    );


    streak =
        completedDays.length || 1;


    localStorage.setItem(
        "gymFitStreak",
        streak
    );


    createDays();

    updateProgress();

    updateChallengeUI();


    if (nextDay < 30) {

        alert(
            "🔥 DAY " +
            nextDay +
            " COMPLETED!\n\n" +

            "Day " +
            (nextDay + 1) +
            " is now unlocked."
        );

    } else {

        alert(
            "🏆 AMAZING!\n\n" +
            "You completed the entire " +
            "30 Day Challenge!"
        );

    }

}


/* =========================================================
   PROGRESS
========================================================= */

function updateProgress() {

    const completed =
        completedDays.length;


    const percentage =
        Math.round(
            (completed / 30) * 100
        );


    const percent =
        document.getElementById(
            "progressPercent"
        );


    if (percent) {

        percent.innerText =
            percentage + "%";

    }


    const bar =
        document.getElementById(
            "progressBar"
        );


    if (bar) {

        bar.style.width =
            percentage + "%";

    }


    const big =
        document.getElementById(
            "bigProgress"
        );


    if (big) {

        big.innerText =
            percentage + "%";

    }


    const workout =
        document.getElementById(
            "workoutCount"
        );


    if (workout) {

        workout.innerText =
            workoutCount;

    }


    const days =
        document.getElementById(
            "dayCount"
        );


    if (days) {

        days.innerText =
            completed;

    }


    const streakHome =
        document.getElementById(
            "streak"
        );


    if (streakHome) {

        streakHome.innerText =
            streak;

    }


    const progressStreak =
        document.getElementById(
            "progressStreak"
        );


    if (progressStreak) {

        progressStreak.innerText =
            streak;

    }

}


/* =========================================================
   WATER
========================================================= */

function addWater() {

    waterCount++;


    localStorage.setItem(
        "gymFitWater",
        waterCount
    );


    updateWater();

}


function updateWater() {

    const water =
        document.getElementById(
            "water"
        );


    if (water) {

        water.innerText =
            waterCount;

    }

}


/* =========================================================
   WATER CLICK
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const stat =
            event.target.closest(
                ".water-card"
            );


        if (!stat) {

            return;

        }


        addWater();

    }
);