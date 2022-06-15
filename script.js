const fileInput = document.querySelector("input"),
downloadbtn = document.querySelector("button");
downloadbtn.addEventListener("click",e => {
    e.preventDefault();//prevent form from submitting
    downloadbtn.innerText = "Downloading file..."
    fetchFile(fileInput.value);
});

function fetchFile(url){
    fetch(url).then(res => res.blob()).then(file => {
        //creates the url of passed object => createObject
        let tempUrl = URL.createObjectURL(file);
        let aTage = document.createElement("a");
        aTage.href = tempUrl; //passing tempurl as href value of <a> tag 
        //passing file lastname and extension as download value of <a> tage
        aTage.download = url.replace(/^.*[\\\/]/,'');
        document.body.appendChild(aTage); //adding <a> tag inside body
        aTage.click();
        aTage.remove();//removing tempUrl from document
        URL.revokeObjectURL(tempUrl);
        downloadbtn.innerText = "Download File";
    }).catch(() => {
        downloadbtn.innerText = "Download File";
        alert("Failed to download file")
    });
}

