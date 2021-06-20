// public/js/script.js
'use strict'



$(() => {


    $('.inner_title').mouseenter(function(event){
        let desc = ($(event.currentTarget).parent().parent().parent().find('dd').clone()).html();
        $(event.currentTarget).parent().append('<dd class="description">' + desc + '</dd">');
    });
    $('.inner_title').mouseleave(function(event){
        $(event.currentTarget).parent().find('dd').remove();
    });


    function get2digits(num) {
        return ('0' + num).slice(-2);
    }

    function getDate(dateObj) {
        if (dateObj instanceof Date)
            return dateObj.getFullYear() + '-' + get2digits(dateObj.getMonth() + 1) + '-' + get2digits(dateObj.getDate());
    }

    function getTime(dateObj) {
        if (dateObj instanceof Date)
            return get2digits(dateObj.getHours()) + ':' + get2digits(dateObj.getMinutes()) + ':' + get2digits(dateObj.getSeconds());
    }

    function convertDate() {
        $('[data-date]').each((index, element) => {
            let dateString = $(element).data('date');
            if (dateString) {
                let date = new Date(dateString);
                $(element).html(getDate(date));
            }
        });
    }

    function convertDateTime() {
        $('[data-date-time]').each((index, element) => {
            let dateString = $(element).data('date-time');
            if (dateString) {
                let date = new Date(dateString);
                $(element).html(getDate(date) + '-' + getTime(date));
            }
        });
    }
    convertDate();
    convertDateTime();
});



/* control category */
function ifCategoryIsOther() {
    let newCategoryDiv = document.createElement('div')
    newCategoryDiv.setAttribute("class", "from-group");
    newCategoryDiv.setAttribute("id", "new_category_form");

    let newCategoryLabel = document.createElement('label');
    newCategoryLabel.innerHTML = "New Category";

    let newCategory = document.createElement('input');
    newCategory.setAttribute("class", "form-control");
    newCategory.setAttribute("type", "text")
    newCategory.setAttribute("id", "txt_other_category");
    newCategory.setAttribute("name", "txt_other_category");
    newCategory.setAttribute("placeholder", "Input new category");

    if ($('#category > option:selected').val().toString() === "other") {
        document.body.querySelector('form').children.item(0).after(newCategoryDiv);
        document.body.querySelector('form').children.item(1).append(newCategoryLabel);
        document.body.querySelector('form').children.item(1).append(newCategory);
    } else {
        document.body.querySelector('#new_category_form').remove();
    }
}

function getCategories() {
    let categoriesHtml = document.getElementsByName('saved_categories');
    let categoriesArr = [];
    Array.prototype.slice.call(categoriesHtml).forEach(categoryHtml => {
        categoriesArr.push(categoryHtml.innerHTML);
    });

    return categoriesArr;
}

function getHiddenCate() {
    let categoriesArr = getCategories();
    let reqCategories = document.createElement('input');
    reqCategories.setAttribute("type", "hidden");
    reqCategories.setAttribute("id", "hid_categories");
    reqCategories.setAttribute("name", "hid_categories");
    reqCategories.setAttribute("value", categoriesArr);

    return reqCategories;
}

function clickSearch() {
    let reqHiddenCategories = getHiddenCate();

    //set request parameter
    document.body.querySelector('.search-form').children.item(0).before(reqHiddenCategories);

    //set method
    document.body.querySelector('.search-form').setAttribute("method", "post");
    document.body.querySelector('.search-form').setAttribute("action", "/posts?_method=search");

    document.search_form.submit();
}


function clickPost(clickedTag) {
    let reqCategories = getCategories(document);
    clickedTag.href = clickedTag.href + '?categories=' + reqCategories;
}

function clickEditView(clickedTag) {
    let reqCategories = document.querySelector('#categories_name').value;
    clickedTag.href = clickedTag.href + '?categories=' + reqCategories;
}

function fromEditToShow(clickedTag) {
    let categoryOptions = document.querySelector('#category').options;
    let arrCategories = [];
    for (let i = 0; i < categoryOptions.length; i++) {
        let option = categoryOptions[i].value;
        if (option !== 'other' && option !== '') arrCategories.push(option);
    }
    let reqCategories = arrCategories.join(',');
    clickedTag.href = clickedTag.href + '?categories=' + reqCategories;
}