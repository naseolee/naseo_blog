// public/js/script.js
'use strict'



$(() =>{
    function get2digits (num){
        return ('0' + num).slice(-2);
    }

    function getDate(dateObj){
    if(dateObj instanceof Date)
        return dateObj.getFullYear() + '-' + get2digits(dateObj.getMonth()+1) + '-' + get2digits(dateObj.getDate());
    }

    function getTime(dateObj){
        if(dateObj instanceof Date)
            return get2digits(dateObj.getHours()) + ':' + get2digits(dateObj.getMinutes()) + ':' + get2digits(dateObj.getSeconds());
    }

    function convertDate(){
        $('[data-date]').each((index,element) => {
            let dateString = $(element).data('date');
            if(dateString){
                let date = new Date(dateString);
                $(element).html(getDate(date));
            }   
        });
    }
    
    function convertDateTime(){
        $('[data-date-time]').each((index,element) => {
            let dateString = $(element).data('date-time');
            if(dateString){
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
    newCategoryDiv.setAttribute("class","from-group");
    newCategoryDiv.setAttribute("id","new_category_form");

    let newCategoryLabel = document.createElement('label');
    newCategoryLabel.innerHTML = "New Category";

    let newCategory = document.createElement('input');
    newCategory.setAttribute("class","form-control");
    newCategory.setAttribute("type","text")
    newCategory.setAttribute("id","txt_other_category");
    newCategory.setAttribute("name","txt_other_category");
    newCategory.setAttribute("placeholder","Input new category");

    if($('#category > option:selected').val().toString() === "other"){
        document.body.querySelector('form').children.item(0).after(newCategoryDiv);
        document.body.querySelector('form').children.item(1).append(newCategoryLabel);
        document.body.querySelector('form').children.item(1).append(newCategory);
   }else{
        document.body.querySelector('#new_category_form').remove();
   }
}

function clickSearch(){
    let categoryHtml = document.getElementsByName('saved_categories');
    let categoriesArr = [];
    Array.prototype.slice.call(categoryHtml).forEach(val => {
        categoriesArr.push(val.innerHTML);
    });

    //hidden category
    let categories = document.createElement('input');
    categories.setAttribute("type","hidden");
    categories.setAttribute("id","hid_categories");
    categories.setAttribute("name","hid_categories");
    categories.setAttribute("value",categoriesArr);
    document.body.querySelector('.search-form').children.item(0).before(categories);
    
    //set method
    document.body.querySelector('.search-form').setAttribute("method","post");
    document.body.querySelector('.search-form').setAttribute("action","/posts?_method=search");
    
    document.search_form.submit();
}
