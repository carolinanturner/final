//Carolina Turner CSCE 242

const submitForm = (e)=> {
    e.preventDefault();
    document.getElementById("success").classList.remove("hidden");

    const form = document.getElementById("project-form");
    const name= form.elements["Name"].value;
    const email= form.elements["Email"].value;
    const pname= form.elements["Project-Name"].value;
    const verifyChecked= form.elements["verify"].checked;
    
    console.log(name);
    console.log(email);
    console.log(getRadioValue("color/bw"));
    console.log(getRadioValue("project-type"));
    console.log(pname);
    console.log(verifyChecked);
}
const getRadioValue = (radioName) => {
    let radios = document.getElementsByName(radioName);
  
    for (let i in radios) {
      if (radios[i].checked) {
        return radios[i].value;
      }
    }
    return "";
  };
 
document.getElementById("project-form").onsubmit = submitForm;