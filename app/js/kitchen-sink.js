var myApp = new Framework7({
    modalTitle: '',
    animateNavBackIcon: true,
    template7Pages: true, // enable Template7 rendering for Ajax and Dynamic pages
});


// Expose Internal DOM library
var $$ = Dom7;

function time() {
    if(document.getElementById('time') != null) {
        var now = new moment();
        document.getElementById('time').innerText = now.format("hh:mm A");
    }
}

function set_day(){
    if(document.getElementById('day') != null) {
        var now = new moment();
        if(now.format("dddd") == "saturday" || now.format("dddd") == "sunday") {
            document.getElementById('day').innerText = "🎉🎉🎉 Happy " + now.format("dddd, MMMM Do")
        }
        else if(now.format("dddd") == "friday") {
            document.getElementById('day').innerText = "🎉🎉 Happy " + now.format("dddd, MMMM Do")
        }
        else {
            document.getElementById('day').innerText = "🎉 Happy " + now.format("dddd, MMMM Do")
        }
    }
}

function update_date_time(){
    set_day()
    time()
}

function everything(){
    set_day()
    time()
    setInterval(update_date_time, 5000)
}

window.onload = everything;

// Add main view
var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true,
});

function changeDate() {
    // return 
}

var searchTemplate = $('script#myTemplate').html();
var value = 1
var virtualList;
axios.get("http://localhost:3000/tasks.json")
.then(function (response) {
    value = response.data.length
    var items = response.data
    virtualList = myApp.virtualList($$(mainView.container).find('.virtual-list'), {
        items: items,
        template: searchTemplate,
        height: function (item) {
            return 60;
        }
    });
})
.catch(function (error) {
    console.log(error);
});


var ptrContent = $$(mainView.container).find('.pull-to-refresh-content');
ptrContent.on('refresh', function (e) {
    axios.get("http://localhost:3000/tasks.json")
    .then(function (response) {        
        setTimeout(function () {
            virtualList.items = response.data
            virtualList.clearCache();
            virtualList.update();
            myApp.pullToRefreshDone();
        }, 3000)
        
    })
    .catch(function (error) {
        console.log(error)
    })
})

myApp.onPageBack('show_project_doerlist', function(page){
    document.getElementById('new_task').innerText = "New Task"
})

myApp.onPageInit('show_project_doerlist', function (page) {
    document.getElementById('new_task').innerText = "Add Task"
})

myApp.onPageInit('show_project_doerlist', function (page) {
    // edit the page to display the data
    axios.get("http://localhost:3000/projects/3.json")
    .then(function (response) {
        // page.router.refreshPage()

        items = response.data.tasks
        console.log(items)
        virtualList = myApp.virtualList($$(page.container).find('.virtual-list'), {
            items: items,
            template: searchTemplate,
            height: function (item) {
                return 60;
            }
        });

    })
    .catch(function (error) {
        console.log(error)
    })
    
})

myApp.onPageInit('show', function (page) {

    axios.get("http://localhost:3000/tasks/1.json")
    .then(function (response) {        
        setTimeout(function () {
            // virtualList.items = response.data
            // virtualList.clearCache();
            // virtualList.update();
            // myApp.pullToRefreshDone();
        }, 1000)
    })
    .catch(function (error) {
        console.log(error)
    })

    $$('#mark_as_completed').on('click', function () {
        myApp.confirm('Mark this task as completed?', function () {
            myApp.alert('List completed')
        })
    })

    $$('#archive_this_task').on('click', function () {
        myApp.confirm('Archive this task?', function () {
            myApp.showIndicator()
            setTimeout(function () {
                myApp.hideIndicator();
                mainView.router.back();
            }, 1000)
        })
    })

    $$('#more_actions').on('click', function () {
    var buttons = [
        {
            text: 'Edit This Task',
            onClick: function () {
                myApp.alert('Button4 clicked');
            }

        },
        {
            text: 'Delete This Task',
            onClick: function () {
                 myApp.showIndicator()
                setTimeout(function () {
                    myApp.hideIndicator();
                    mainView.router.back();
                }, 1000)
                // myApp.alert('Button4 clicked');
                // url = ""
                // axios.delete(url, data)
                // .then(function (response) { 
                //     myApp.showIndicator();       
                //     setTimeout(function () {
                //         myApp.hideIndicator();
                //         mainView.router.back();
                //     }, 1000)
                // })
                // .catch(function (error) {
                //     console.log(error);
                // })
            }

        },
        {
            text: 'Copy Public Link',
            onClick: function () {
                myApp.alert('Button4 clicked');
            }
            
        },
        {
            text: 'Cancel',
            color: 'red'
        },
    ];
    myApp.actions(buttons);
    });
});

myApp.onPageInit('create', function (page) {
    $$('#create').on('click', function () {
        // url = "http://localhost:3000/projects.json"
        // data = {"completion_status":100,
        //         "archive":true,
        //         "public_link":"",
        //         "public_link_status":true,
        //         "name":"test ",
        //         "created_at":"2017-07-19T08:55:40.217Z",
        //         "updated_at":"2017-07-19T08:55:40.217Z"}

        url = "http://localhost:3000/tasks.json"
        data = {"note":"",
                "duedate":"2017-07-20T09:50:00.000Z",
                "public_link":"",
                "completion_status":null,
                "archive":false,
                "public_link_status":false,
                "name":"ready",
                "project_id": 1,
                "user_id": 1}
                // ,
                // "created_at":"2017-07-20T09:50:46.454Z",
                // "updated_at":"2017-07-20T09:58:09.541Z",
                // "url":"http://localhost:3000/tasks/8.json"}

        axios.post(url, data)
        .then(function (response) { 
            myApp.showIndicator();       
            setTimeout(function () {
                myApp.hideIndicator();
                mainView.router.back();
            }, 1000)
        })
        .catch(function (error) {
            console.log(error);
        })
    })
})

// Show/hide preloader for remote ajax loaded pages
// Probably should be removed on a production/local app
$$(document).on('ajaxStart', function (e) {
    if (e.detail.xhr.requestUrl.indexOf('autocomplete-languages.json') >= 0) {
        // Don't show preloader for autocomplete demo requests
        return;
    }
    myApp.showIndicator()
})

$$(document).on('ajaxComplete', function (e) {
    if (e.detail.xhr.requestUrl.indexOf('autocomplete-languages.json') >= 0) {
        // Don't show preloader for autocomplete demo requests
        return;
    }
    myApp.hideIndicator()
})




