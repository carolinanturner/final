//Carolina Turner CSCE 242
const showEmailResult = async (e) => {
    e.preventDefault();
    document.getElementById("result").classList.remove("hidden");
    const firstName=document.getElementById("name").value;
    const email=document.getElementById("email").value;
    const subjectMatter=document.getElementById("message").value;
    let response = await getEmailResult();
    if (response.status == 200) {
      result.innerHTML = "Your contact form=" 
      + "First & Last Name: " +firstName + 
      "Email : "+email  + "Subject Matter : " +subjectMatter;
    } else {
      result.innerHTML = "Sorry, your email was not sent.";
    }
  };
  
  
  const getEmailResult = async (e) => {
    e.preventDefault();
    const form = document.getElementById("contact_form");
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    const result = document.getElementById("result");
    result.innerHTML = "Please wait...";
  
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });
      return response;
    } catch (error) {
      console.log(error);
      document.getElementById("result").innerHTML =
        "Sorry your email couldn't be sent";
    }
  };
  
  window.onload = () =>{
    document.getElementById("submit").onclick=showEmailResult;
  
  }