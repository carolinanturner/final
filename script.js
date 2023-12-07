//Carolina Turner CSCE 242
const getCourses = async ()=>{
  const url = "https://carolinanturner.github.io/projects/part%205/json/courses.json";

  try {
      const response = await fetch(url);
      return await response.json();
  }catch (error){
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


window.onload= ()=>{
  showCourses();
}