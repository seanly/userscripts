// ==UserScript==
// @name        jenkins-role-strategy-filter
// @namespace   smf.jenkins.tools
// @include     */role-strategy/assign-roles
// @version     1.0
// ==/UserScript==

/*
 * The MIT License
 *
 * Copyright (c) 2019, Smart Mobile Factory, Silas Toepfer
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * Bootstrap to inject a custom JS function into the page and take advantage
 * of the javascript libraries included in the host page.
 */
window.addEventListener("load", function() {
   createScript(main);
}, false);


/**
 * Create a script element and inject a JS function into.
 */
function createScript(fn) {
   var script = document.createElement('script');
   script.setAttribute("type", "application/javascript");
   script.textContent = '(' + fn + ')();'; //The JS function to run
   document.body.appendChild(script); // run the script
   document.body.removeChild(script); // clean up
}


/**
 * The function injected in the page
 */
function main(){

  /**
 * Filter table by Users
 */

  function filterUsers(event) {
    //get event and table to filter
    var filter = event.target.value.toUpperCase();
    var rows = document.querySelector("#projectRoles tbody").rows;
    //iterate over the rows in the table
    for (var i = 0; i < rows.length; i++) {
        //get text content of first row to get the usernames
        var secondCol = rows[i].cells[1].textContent.toUpperCase();
        //show/hide row based on input
        if (secondCol.indexOf(filter) > -1) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
    //make sure the header row is always shown
    //document.getElementsByClassName('group-row')[1].style.display = "table-row"
    var elements = document.getElementsByClassName('group-row');
    for(var j =0; j<elements.length; j++) {
      elements[j].style.display='';
    }
  }

  /**
 * Filter table by projects
 */

  function filterProjects(event) {
    //get event and table to filter
    var filter = event.target.value.toUpperCase();
    var table = document.getElementById('projectRoles');
    //iterate over the rows in the table
    for (var r = 0, n = table.rows.length; r < n; r++) {
        //iterate over the columns in the table
        for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
            //set regex to get inner html names of the cells
            var regex = /\[(.*?)\]/gm;
            //show hide cells based on their appearence in the html
            if(table.rows[r].cells[c].innerHTML.match(regex) !== null) {
              var substring = table.rows[r].cells[c].innerHTML.match(regex)
              console.log(substring[0])
              if (substring[0].toUpperCase().indexOf(filter) > -1) {
                  table.rows[r].cells[c].style.display = "";
              } else {
                table.rows[r].cells[c].style.display = "none";
                //make sure username and delete button are always shown
                table.rows[r].cells[1].style.display = "";
                table.rows[r].cells[0].style.display = "";
              }
            } else {
              //make sure header of columns is always shown
              if (table.rows[r].cells[c].textContent.toUpperCase().indexOf(filter) > -1 && table.rows[r].cells[c].classList.contains('pane-header')) {
                  table.rows[r].cells[c].style.display = "";
              } else {
                table.rows[r].cells[c].style.display = "none";
                table.rows[r].cells[1].style.display = "";
                table.rows[r].cells[0].style.display = "";
              }
            }
        }
    }
    //make sure table header is always shown
      document.getElementsByClassName('group-row')[1].cells[1].style.display = ""
  }

    /**
 * Filter global role table by users
 */

  function filterGlobalUsers(event) {
    var filter = event.target.value.toUpperCase();
    var rows = document.querySelector("#globalRoles tbody").rows;

    for (var i = 0; i < rows.length; i++) {
        var secondCol = rows[i].cells[1].textContent.toUpperCase();
        if (secondCol.indexOf(filter) > -1) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
    document.getElementsByClassName('group-row')[0].style.display = ""
  }

    /**
 * Filter global role table by projects
 */

  function filterGlobalProjects(event) {
    var filter = event.target.value.toUpperCase();
    var table = document.getElementById('globalRoles');
    for (var r = 0, n = table.rows.length; r < n; r++) {
        for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
            var regex = /\[(.*?)\]/gm;
            if(table.rows[r].cells[c].innerHTML.match(regex) !== null) {
              var substring = table.rows[r].cells[c].innerHTML.match(regex)
              console.log(substring[0])
              if (substring[0].toUpperCase().indexOf(filter) > -1) {
                  table.rows[r].cells[c].style.display = "";
              } else {
                table.rows[r].cells[c].style.display = "none";
                table.rows[r].cells[1].style.display = "";
                table.rows[r].cells[0].style.display = "";
              }
            } else {
              if (table.rows[r].cells[c].textContent.toUpperCase().indexOf(filter) > -1 && table.rows[r].cells[c].classList.contains('pane-header')) {
                  table.rows[r].cells[c].style.display = "";
              } else {
                table.rows[r].cells[c].style.display = "none";
                table.rows[r].cells[1].style.display = "";
                table.rows[r].cells[0].style.display = "";
              }
            }
        }
    }
      document.getElementsByClassName('group-row')[1].cells[1].style.display = ""
  }

  //generate the global role user filter input and append it to the DOM
  document.getElementsByClassName('section-header')[0].innerHTML += '<p style="border-top: 1px solid #c7c7c7; padding-top: 15px;">Filter by User: </p>&nbsp;<input type="text" id="userInputGlob">';

  //generate the global role project filter input and append it to the DOM
  document.getElementsByClassName('section-header')[0].innerHTML += '<p>Filter by Group: </p>&nbsp;<input style="margin-bottom: 15px;" type="text" id="projectInputGlob">';

    //listen to events in the global role user input field to call the filter function
  document.querySelector('#userInputGlob').addEventListener('keyup', filterGlobalUsers, false);

  //listen to events in the global role project input field to call the filter function
  document.querySelector('#projectInputGlob').addEventListener('keyup', filterGlobalProjects, false);


  //generate the user filter input and append it to the DOM
  document.getElementsByClassName('section-header')[1].innerHTML += '<p style="border-top: 1px solid #c7c7c7; padding-top: 15px;">Filter by User: </p>&nbsp;<input type="text" id="userInput">';

  //generate the project filter input and append it to the DOM
  document.getElementsByClassName('section-header')[1].innerHTML += '<p>Filter by Group: </p>&nbsp;<input style="margin-bottom: 15px;" type="text" id="projectInput">';

  //listen to events in the user input field to call the filter function
  document.querySelector('#userInput').addEventListener('keyup', filterUsers, false);

  //listen to events in the project input field to call the filter function
  document.querySelector('#projectInput').addEventListener('keyup', filterProjects, false);
}

