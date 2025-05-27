console.log("hello")

const loadcategoriesBtn = ()=> {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
.then((res) => res.json())
.then((data) => displayCategories(data.categories))
.catch((error)=> console.log(error))
}

function displayCategories(categories) {

    const categoriesBtn = document.getElementById("categores_btn");

    categories.forEach( (item) => {
        // console.log(item)

        // create a button for item
        const button = document.createElement('button');
        button.classList = 'btn flex gap-5 p-6 w-40 lg:w-50 h-15 border border-[#dbebec]';
        button.innerHTML = 
        `
        <div class="w-8"><img src='${item.category_icon}'/> </div>
        <div><h4 class="font-bold text-[20px]"> ${item.category}</h4> </div>
        `
        categoriesBtn.appendChild(button);
    });
    
}



loadcategoriesBtn()