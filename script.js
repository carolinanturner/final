//Carolina Turner CSCE 242
const getCourses = async ()=>{
  try {
    return (
      await fetch("https://carolinanturner.github.io/projects/part%205/json/courses.json")
    ).json();
  } catch (error) {
    console.log(error);
  }
};

const showCourses = async () =>{
  let courses = await getCourses ();
  let coursesSection=document.getElementById("courses-section");
  courses.forEach((course) => {
      coursesSection.append(getCourseItem(course));
  });

};

const getCourseItem=(course)=>{
  let section=document.createElement("section");

  let h3=document.createElement("h3");
  h3.innerText=course.title;
  section.append(h3);

  let ul = document.createElement("ul");
  section.append(ul);
  ul.append(getLi(`Course Code: ${course.code}`));
  ul.append(getLi(`Year Taken: ${course.year}`));
  ul.append(getLi(`Semester Taken: ${course.semester}`));
  ul.append(getLi(`Professor: ${course.professor}`));
  ul.append(getLi(`Course Description: ${course.description}`));
  section.classList.add("course");

  return section;
}


const getLi = data=>{
  const li =document.createElement("li");
  li.textContent= data;
  return li;
}
///////////////////////////

const displayDetails = (course) => {
  const courseDetails = document.getElementById("course-details");
  courseDetails.innerHTML = "";

  const h3 = document.createElement("h3");
  h3.innerHTML = course.title;
  courseDetails.append(h3);

  const dLink = document.createElement("a");
  dLink.innerHTML = "	&#x2715;";
  courseDetails.append(dLink);
  dLink.id = "delete-link";

  const eLink = document.createElement("a");
  eLink.innerHTML = "&#9998;";
  courseDetails.append(eLink);
  eLink.id = "edit-link";
  
  const codeP = document.createElement("p");
  courseDetails.append(codeP);
  codeP.innerHTML = "Course Code:  "+ course.code;

  const yearP = document.createElement("p");
  courseDetails.append(yearP);
  yearP.innerHTML ="Year recommended to take:  " +course.year;

  const semesterP = document.createElement("p");
  courseDetails.append(semesterP);
  semesterP.innerHTML = "Semester recommended to take:  " +course.semester;

  const descriptionP =document.createElement("p");
  courseDetails.append(descriptionP);
  descriptionP.innerHTML ="";

  eLink.onclick = (e) => {
    e.preventDefault();
    document.querySelector(".dialog").classList.remove("transparent");
    document.getElementById("add-edit-course-form").innerHTML = "Edit Course";
  };

  dLink.onclick = (e) => {
    e.preventDefault();
    deleteCourse(course._id);
  };

  populateEditForm(course);
};
async function deleteCourse(_id) {
  let response = await fetch(`/api/courses/${_id}`,{
  method : "DELETE",
  headers : {
        "Content-Type": "application/json;charset-utf-8",
      } ,
    });
    if(response.status !=200){
      console.log("error deleting!");
      return;
    }

    let result = await response.json(); 
    showCourses();
    document.getElementById("course-details").innerHTML= "";
    resetForm();
    showCourses();
  };

  const populateEditForm = (course) => {
    const form = document.getElementById("add-edit-course-form");
    form._id.value=course._id,
    form.title.value = course.title;
    form.code.value = course.code;
    form.year.value = course.year;
    form.semester.value = course.semester;
    form.description.value = course.description;
  
};

const addEditCourse = async (e) => {
  e.preventDefault();

  const form = document.getElementById("add-edit-course-form");
  const formData = new FormData(form);
  formData.append("course", getCourses());

  let response;
  console.log(form._id.value > 0 && form._id.value.length);
  if (form._id.value == -1) {
    formData.delete("_id");
    console.log(...formData);
    response = await fetch(
      "/api/courses/",
      {
        method: "POST",
        body: formData,
      }
    );
  } else {
    console.log("editting course");
    response = await fetch(
      `/api/courses/${form._id.value}`,
      {
        method: "PUT",
        body: formData,
      }
    );
  }

  if (response.status != 200) {
    console.log("ERROR posting data");
    return;
  }

  let result = await response.json();

  if (form._id.value != -1) {
    const course = await getCourses(form._id.value);
    displayDetails(course);
  }

  document.querySelector(".dialog").classList.add("transparent");
  resetForm();
  showCourses();
};
////////////////////////////////////
const showHideAdd = (e) => {
  e.preventDefault();
  document.querySelector(".dialog").classList.remove("transparent");
  document.getElementById("add-edit-title").innerHTML = "Add Course";
  resetForm();
};
window.onload= ()=>{
  showCourses();
 // document.getElementById("add-course").onclick = addEditCourse;
  document.getElementById("add-edit-course-form").onsubmit = addEditCourse;
  document.getElementById("add-link").onclick = showHideAdd;

  document.querySelector(".close").onclick = () => {
    document.querySelector(".dialog").classList.add("transparent");
  };
}