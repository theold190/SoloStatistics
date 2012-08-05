// Set Russian as a default language and a course
var default_language = 1;
var default_course = 1;

function toggleSaveButtonStatus(disable) {
  document.getElementById("IDSaveButton").disabled = disable;
}

function setSelectedItem(id, value) {
  var list = document.getElementById(id);
  for (var i=0; i<list.options.length; i++) {
    if (list.options[i].value == value) {
      list.options[i].selected = true;
      return;
    }
  }
}

// Saves options to localStorage.
function saveOptions() {
  var list = document.getElementById("IDLanguage");
  var index = list.selectedIndex;
  localStorage["language"] = list.options[index].value;

  list = document.getElementById("IDCourse");
  index = list.selectedIndex;
  localStorage["course"] = list.options[index].value;

  var profile = document.getElementById("IDProfile").value;
  localStorage["profile"] = profile;

  toggleSaveButtonStatus(true);
}

// Restores values from localStorage.
function restoreOptions() {
  var language = localStorage["language"];
  if (!language) {
    language = default_language;
  }
  setSelectedItem("IDLanguage", language);

  var course = localStorage["course"];
  if (!course) {
    course = default_course;
  }
  setSelectedItem("IDCourse", course);

  var profile = localStorage["profile"];
  if (!profile) {
    profile = "";
  }
  document.getElementById("IDProfile").value = profile;

  toggleSaveButtonStatus(true);
}

function setFocus()
{
  document.getElementById("IDProfile").focus();
}

function updateLink() {
    var a = document.getElementById("IDCheck");
    var profile = document.getElementById("IDProfile").value;
    var href = "http://nabiraem.ru/user/"+profile;
    a.href = href;
}
