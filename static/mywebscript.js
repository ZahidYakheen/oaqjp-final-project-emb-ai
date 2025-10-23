let RunSentimentAnalysis = () => {
    let textToAnalyze = document.getElementById("textToAnalyze").value;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = xhttp.responseText;
            try {
                let jsonResp = JSON.parse(response);
                if (jsonResp.message) {
                    document.getElementById("system_response").innerHTML = jsonResp.message;
                } else {
                    document.getElementById("system_response").innerHTML = JSON.stringify(jsonResp, null, 2);
                }
            } catch(e) {
                document.getElementById("system_response").innerHTML = response;
            }
        }
    };
    xhttp.open("POST", "/emotionDetector", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send("text=" + encodeURIComponent(textToAnalyze));
}
