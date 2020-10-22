(() => {
    // XHTTP is the old tried-and-true way of doing AJAX - still relevant, but there are better options
    
     // create an instance of the AJAX object
    let myReq = new XMLHttpRequest;

    // add an event handler so that we can track the stages of the request and respond accordingly
    myReq.addEventListener('readystatechange', handleRequest);

    // get the request ready to go / configure it with method and resource request
    myReq.open('GET', '../DataSet.json');
    
    // send the request off to the server
    myReq.send();

    // this is a passive listener function - it gets invoked for every stage of the AJAX request. When the request is done and the data payload is returned from the server it passes that data to the handleDataSet function
    function handleRequest() {
        if (myReq.readyState === XMLHttpRequest.DONE) {
            // check status here and proceed
            if (myReq.status === 200) {
                // 200 means done and dusted, ready to go with the dataset!
                handleDataSet(myReq.responseText);

            } else {
                // probably got some kind of error code, so handle that 
                // a 404, 500 etc... can render appropriate error messages here
                console.error(`${myReq.status} : something done broke, son`);
            }
        } else {
            // request isn't ready yet, keep waiting...
            console.log(`Request state: ${myReq.readyState}. Still processing...`);
        }

    }

    // this receives the data payload from our AJAX request, parses it (turns the returned JSON object back into a plain JavaScript object) and renders the data to our view (the markup in index.html)
    function handleDataSet(data) {
        let myData = JSON.parse(data),
            userSection = document.querySelector('.user-section'),
            userTemplate = document.querySelector('#user-template').content;

        debugger;

        // loop through the JavaScript object and for each user, make a copy of the user template we find at the bottom of index.html, populate it with the user's data, and put that fresh copy in the users section in index.html

        for (let user in myData) {
            let currentUser = userTemplate.cloneNode(true),
                currentUserText = currentUser.querySelector('.user').children;

            currentUserText[1].textContent = myData[user].name;
            currentUserText[2].textContent = myData[user].role;
            currentUserText[3].textContent = myData[user].nickname;

            // add this new user to the view
            userSection.appendChild(currentUser);
        }

        console.log(data);
    }
})();