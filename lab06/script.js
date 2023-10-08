        // Function to set a cookie with a given name and value
        function setCookie(name, value, days) {
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + value + expires + "; path=/";
        }

        // Function to get the value of a cookie by name
        function getCookie(name) {
            var nameEQ = name + "=";
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                while (cookie.charAt(0) == ' ') {
                    cookie = cookie.substring(1, cookie.length);
                }
                if (cookie.indexOf(nameEQ) == 0) {
                    return cookie.substring(nameEQ.length, cookie.length);
                }
            }
            return null;
        }

        // Check if the user has already voted
        var hasVoted = getCookie("voted");

        // Initialize like and dislike counts based on cookies
        var likeCount = parseInt(document.getElementById("likeCount").innerText) ;
        var dislikeCount = parseInt(document.getElementById("dislikeCount").innerText) ;

        // Update the counter elements
        document.getElementById("likeCount").textContent = likeCount;
        document.getElementById("dislikeCount").textContent = dislikeCount;

        if (hasVoted) {
            disableButtons(); // Disable buttons if the user has already voted
        }

        // Function to handle a "Like" click
        function doLike() {
            if (!hasVoted) {
                likeCount++;
                document.getElementById("likeCount").textContent = likeCount;
                setCookie("voted", "true", 365); // Set a cookie to prevent multiple votes
                disableButtons(); // Disable buttons after voting
            }
        }

        // Function to handle a "Dislike" click
        function doDislike() {
            if (!hasVoted) {
                dislikeCount++;
                document.getElementById("dislikeCount").textContent = dislikeCount;
                setCookie("voted", "true", 365); // Set a cookie to prevent multiple votes
                disableButtons(); // Disable buttons after voting
            }
        }

        // Function to disable voting buttons
        function disableButtons() {
            document.querySelectorAll(".button").forEach(function(button) {
                button.disabled = true;
            });
        }