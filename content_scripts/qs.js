function addSearchLinks(root) {
    var google_pre = "https://www.google.com/search?q=";
    var ntucourse_post = " site:ptt.cc/bbs/NTUcourse";
    var course_kw = "課程名稱", lecturer_kw = "授課教師";
    
    var tables = root.getElementsByTagName("table");
    var course_table = tables[tables.length-2];
    
    var rows = course_table.children[0].children;
    var titles = rows[0].children;
    var qs_idx = titles.length-1;
    for (var i=0; i<rows.length; i++) {
        rows[i].insertCell(qs_idx);
    }
    titles[qs_idx].style.width = "5%";
    titles[qs_idx].innerHTML = "NTUcourse <br/> 搜尋"
    
    var course_idx = -1, lecturer_idx = -1;
    for (var i=0; i<titles.length; i++) {
        if (titles[i].innerHTML.includes(course_kw)) {
            course_idx = i;
        } else if (titles[i].innerHTML.includes(lecturer_kw)) {
            lecturer_idx = i;
        }
    }
    
    for (var i=1; i<rows.length; i++) {
        var course_valid = true, lecturer_valid = true;
        var qs_col = rows[i].children[qs_idx];
        try {
            var course = rows[i].children[course_idx].getElementsByTagName("a")[0].innerHTML;
        } catch(err) {
            course_valid = false;
        }
        try {
            var lecturer = rows[i].children[lecturer_idx].getElementsByTagName("a")[0].innerHTML;
        } catch(err) {
            lecturer_valid = false;
        }
        
        if (course_valid && lecturer_valid) {
            var search_both = root.createElement("a");
            search_both.target = "_blank";
            search_both.href = encodeURI(google_pre + lecturer + " " + course + ntucourse_post);
            search_both.innerHTML = "教師+課名";
            qs_col.appendChild(search_both);
            qs_col.appendChild(root.createElement("br"));
        }
        if (course_valid) {
            var search_course = root.createElement("a");
            search_course.target = "_blank";
            search_course.href = encodeURI(google_pre + course + ntucourse_post);
            search_course.innerHTML = "課名";
            qs_col.appendChild(search_course);
            qs_col.appendChild(root.createElement("br"));
        }
        if (lecturer_valid) {
            var search_lecturer = root.createElement("a");
            search_lecturer.target = "_blank";
            search_lecturer.href = encodeURI(google_pre + lecturer + ntucourse_post);
            search_lecturer.innerHTML = "教師";
            qs_col.appendChild(search_lecturer);
        }
    }
}

function checkURL(url) {
    var nol_kw = "coursesearch", menu_kw = "index.php", info_kw = "print_table.php";
    if (!url.includes(nol_kw)) {
        return false;
    } else {
        if (url.includes(menu_kw) || url.includes(info_kw)) {
            return false;
        } else {
            return true;
        }
    }
}

function checkFrame() {
    for (var i=0; i<window.frames.length; i++) {
        if (window.frames[i].name == "main") {
            if (checkURL(window.frames[i].document.URL)) {
                addSearchLinks(window.frames[i].document);
            }
        }
    }
}

function init() {
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    if (checkURL(document.URL)) {
        addSearchLinks(document);
    } else {
        document.getElementsByName("main")[0].onload = checkFrame;
    }  
}

window.onload = init;
init(); // Fix window.onload not triggered
