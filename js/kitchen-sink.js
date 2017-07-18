var myApp = new Framework7({
    modalTitle: '',
    animateNavBackIcon: true,
});

// Expose Internal DOM library
var $$ = Dom7;

myApp.onPageInit('index', function (page) {
    // Dummy Content
    // var songs = ['Yellow Submarine', 'Don\'t Stop Me Now', 'Billie Jean', 'Californication'];
    // var authors = ['Beatles', 'Queen', 'Michael Jackson', 'Red Hot Chili Peppers'];

    var ptrContent = $$(page.container).find('.pull-to-refresh-content');

    ptrContent.on('refresh', function (e) {

        setTimeout(function () {
            // var picURL = 'http://lorempixel.com/88/88/abstract/' + Math.round(Math.random() * 10);
            // var song = songs[Math.floor(Math.random() * songs.length)];
            // var author = authors[Math.floor(Math.random() * authors.length)];
            // var linkHTML = '<li class="item-content">' +
            //                     '<div class="item-media"><img src="' + picURL + '" width="44"/></div>' +
            //                     '<div class="item-inner">' +
            //                         '<div class="item-title-row">' +
            //                             '<div class="item-title">' + song + '</div>' +
            //                         '</div>' +
            //                         '<div class="item-subtitle">' + author + '</div>' +
            //                     '</div>' +
            //                 '</li>';
            // ptrContent.find('ul').prepend(linkHTML);
            // When loading done, we need to "close" it
            myApp.pullToRefreshDone();
        }, 2000);
    });
});

function time() {
    var now = new moment();
    document.getElementById('time').innerText = now.format("hh:mm A");
}

function set_day(){
    var now = new moment();

    if(now.format("dddd") == "saturday" || now.format("dddd") == "sunday")
        document.getElementById('day').innerText = "🎉🎉🎉 Happy " + now.format("dddd, MMMM Do")
    else if(now.format("dddd") == "friday")
        document.getElementById('day').innerText = "🎉🎉 Happy " + now.format("dddd, MMMM Do")
    else 
        document.getElementById('day').innerText = "🎉 Happy " + now.format("dddd, MMMM Do")
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
    // Enable Dynamic Navbar for this view
    dynamicNavbar: true,
});


myApp.onPageBack('show_project_doerlist', function(page){
    document.getElementById('new_task').innerText = "New Task"
})

myApp.onPageInit('show_project_doerlist', function (page) {
    document.getElementById('new_task').innerText = "Add Task"
})

myApp.onPageInit('show', function (page) {
    

    $$('#mark_as_completed').on('click', function () {
        myApp.confirm('Mark this task as completed?', function () {
            myApp.alert('List completed');
        })
    })

    $$('#archive_this_task').on('click', function () {
        myApp.confirm('Archive this task?', function () {
           myApp.alert('Task archived');
        })
    })

    $$('#more_actions').on('click', function () {
    var buttons = [
        {
            text: 'Delete This List',
            onClick: function () {
                myApp.alert('Button4 clicked');
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



// Show/hide preloader for remote ajax loaded pages
// Probably should be removed on a production/local app
$$(document).on('ajaxStart', function (e) {
    if (e.detail.xhr.requestUrl.indexOf('autocomplete-languages.json') >= 0) {
        // Don't show preloader for autocomplete demo requests
        return;
    }
    myApp.showIndicator();
});
$$(document).on('ajaxComplete', function (e) {
    if (e.detail.xhr.requestUrl.indexOf('autocomplete-languages.json') >= 0) {
        // Don't show preloader for autocomplete demo requests
        return;
    }
    myApp.hideIndicator();
});

// // Callbacks for specific pages when it initialized
// /* ===== Modals Page events  ===== */
// myApp.onPageInit('modals', function (page) {

//     // $$('.toggle-sortable').on('click', function () {
//     //     if ($(this).text() == "Done")
//     //         $(this).text("Edit")
//     //     else
//     //         $(this).text("Done");
//     //     myApp.sortableToggle('.sortable');
//     // });


//     $$('.demo-alert').on('click', function () {
//         myApp.alert('Hello!');
//     });
//     $$('.demo-confirm').on('click', function () {
//         myApp.confirm('Are you feel good today?', function () {
//             myApp.alert('Great!');
//         });
//     });
//     $$('.demo-prompt').on('click', function () {
//         myApp.prompt('What is your name?', function (data) {
//             // @data contains input value
//             myApp.confirm('Are you sure that your name is ' + data + '?', function () {
//                 myApp.alert('Ok, your name is ' + data + ' ;)');
//             });
//         });
//     });
//     $$('.demo-login').on('click', function () {
//         myApp.modalLogin('Enter your username and password', function (username, password) {
//             myApp.alert('Thank you! Username: ' + username + ', password: ' + password);
//         });
//     });
//     $$('.demo-password').on('click', function () {
//         myApp.modalPassword('Enter your password', function (password) {
//             myApp.alert('Thank you! Password: ' + password);
//         });
//     });
//     $$('.demo-modals-stack').on('click', function () {
//         // Open 5 alerts
//         myApp.alert('Alert 1');
//         myApp.alert('Alert 2');
//         myApp.alert('Alert 3');
//         myApp.alert('Alert 4');
//         myApp.alert('Alert 5');
//     });
//     $$('.demo-picker-modal').on('click', function () {
//         myApp.pickerModal('.picker-modal-demo');
//     });
// });

// /* ===== Preloader Page events ===== */
// myApp.onPageInit('preloader', function (page) {

//     $$('.demo-indicator').on('click', function () {
//         myApp.showIndicator();
//         setTimeout(function () {
//             myApp.hideIndicator();
//         }, 2000);
//     });
//     $$('.demo-preloader').on('click', function () {
//         myApp.showPreloader();
//         setTimeout(function () {
//             myApp.hidePreloader();
//         }, 2000);
//     });
//     $$('.demo-preloader-custom').on('click', function () {
//         myApp.showPreloader('My text...');
//         setTimeout(function () {
//             myApp.hidePreloader();
//         }, 2000);
//     });
// });

// /* ===== Swipe to delete events callback demo ===== */
// myApp.onPageInit('swipe-delete', function (page) {
//     $$('.demo-remove-callback').on('deleted', function () {
//         myApp.alert('Thanks, item removed!');
//     });
// });
// myApp.onPageInit('swipe-delete media-lists', function (page) {
//     $$('.demo-reply').on('click', function () {
//         myApp.alert('Reply');
//     });
//     $$('.demo-mark').on('click', function () {
//         myApp.alert('Mark');
//     });
//     $$('.demo-forward').on('click', function () {
//         myApp.alert('Forward');
//     });
// });


// /* ===== Action sheet, we use it on few pages ===== */
// myApp.onPageInit('swipe-delete modals media-lists', function (page) {
//     var actionSheetButtons = [
//         // First buttons group
//         [
//             // Group Label
//             {
//                 text: 'Here comes some optional description or warning for actions below',
//                 label: true
//             },
//             // First button
//             {
//                 text: 'Alert',
//                 onClick: function () {
//                     myApp.alert('He Hoou!');
//                 }
//             },
//             // Another red button
//             {
//                 text: 'Nice Red Button ',
//                 color: 'red',
//                 onClick: function () {
//                     myApp.alert('You have clicked red button!');
//                 }
//             },
//         ],
//         // Second group
//         [
//             {
//                 text: 'Cancel',
//                 bold: true
//             }
//         ]
//     ];
//     $$('.demo-actions').on('click', function (e) {
//         myApp.actions(actionSheetButtons);
//     });
//     $$('.demo-actions-popover').on('click', function (e) {
//         // We need to pass additional target parameter (this) for popover
//         myApp.actions(this, actionSheetButtons);
//     });

// });




