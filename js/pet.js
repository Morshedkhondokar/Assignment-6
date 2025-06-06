console.log("hello")
// get the all categories btn data
const loadcategoriesBtn = ()=> {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
.then((res) => res.json())
.then((data) => displayCategories(data.categories))
.catch((error)=> console.log(error))
}

// get the all pets data and descending order
const loadPets = ()=> {
  fetch('https://openapi.programming-hero.com/api/peddy/pets')
.then((res) => res.json())
.then((data) => {
    // !sort by price working here for all pets descending order 
    document.getElementById("sortBtn").addEventListener("click",function(){
        const sorByPrice = data.pets.sort((a,b) => b.price - a.price)
        displayPets(sorByPrice)
    })
    displayPets(data.pets)
})
.catch((error)=> console.log(error))
}

// display pets 
const displayPets = (pets) => {
    // console.log(pets)
    const petsContainer = document.getElementById('petDesplay');
    petsContainer.innerHTML = "";

    if(pets.length == 0){
        petsContainer.classList.remove("grid")
         petsContainer.innerHTML = `
         <div class=" h-[300px] bg-[#f8f8f8] rounded-xl flex flex-col justify-center items-center text-center p-10">        
        <div class=""> <img class="w-32 mx-auto" src="images/error.webp" /><div>
        <div> <h1 class="text-2xl md:text-4xl font-bold">No Information Available</h1><div>
         </div>
         `; 
         return;
    }else{
        petsContainer.classList.add("grid")
        
    }

    

    pets.forEach( (pet)=>{
        // console.log(pet)

        // loading  start
        const loading = document.getElementById("loading");
        const likePetsHidden = document.getElementById("likePets");
        likePetsHidden.classList.add("hidden")
        petsContainer.classList.add("hidden")
        loading.classList.remove("hidden")
        // loading end

        const div = document.createElement('div');
        div.classList = 'flex flex-col border border-[#e7e7e7] rounded-xl p-3'
        setTimeout(()=>{
             // loading  start
            petsContainer.classList.remove("hidden")
            likePetsHidden.classList.remove("hidden")
            loading.classList.add("hidden")
            // loading end
            div.innerHTML = `
        <div class=" rounded-xl overflow-hidden mb-3"> 
        <img src="${pet.image}"/> 
         </div>

        <div> 
        <h2 class="font-bold text-[20px]">${pet.pet_name}</h2>
        <h5 class="font-bold text-[16px] text-[#5a5a5a]"> <i class="text-[15px] mr-2 fas fa-paw text-2xl"></i> Breed: ${!pet.vaccinated_status ? "No info" : pet.vaccinated_status}</h5>
        <h5 class="font-bold text-[16px] text-[#5a5a5a]"> <i class="text-[15px] mr-2 fas fa-calendar-alt text-2xl"></i> Birth: ${!pet.date_of_birth ? "No info" : pet.date_of_birth} </h5>
        <h5 class="font-bold text-[16px] text-[#5a5a5a]"> <i class="text-[15px] mr-2 fas fa-mercury text-2xl"></i>
         Gender: ${!pet.gender ? "Female" : pet.gender}</h5> 
        <h5 class="font-bold text-[16px] text-[#5a5a5a]"> <i class="text-[15px] mr-2 fas fa-dollar-sign text-2xl"></i> Price: ${!pet.price ? "No info": pet.price}$</h5> 
         </div> 

         <div class="border border-[#e7e7e7] my-3"></div>

         <div class="flex justify-between">
         <button onclick="petsID(${pet.petId})" class="w-10 h-8 btn border border-[#0e7a81] hover:bg-[#0e7a81] hover:text-white"> <i class="fas fa-thumbs-up text-gray-300 hover:text-white text-[20px]"></i></button>
         <button onclick="CountNumber()" class="h-8 btn border text-[#0e7a81] border-[#0e7a81] hover:bg-[#0e7a81] hover:text-white">Adopt</button>
         <button onclick="ShowDetails(${pet.petId})" class="h-8 btn border text-[#0e7a81] border-[#0e7a81] hover:bg-[#0e7a81] hover:text-white">Details </button>
         </div>
        `
        },2000)
        petsContainer.appendChild(div)
    })
}

// count number for adopt button
const CountNumber = () => {
    const countbtn = document.getElementById("countNumber");
    const countdisplay = document.getElementById("countDisplay")
    let number = 3;

    countdisplay.innerText = number;
    const countdown = setInterval(()=>{
        number--;
    countdisplay.innerText = number;

        if(number === 1){
            clearInterval(countdown)
            countbtn.close()
        }
    },1000)
    countbtn.showModal()
}


// pet details API
const ShowDetails =(details) => {
    // console.log(details)
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${details}`)
.then((res) => res.json())
.then((data) => ShowDetailsOnDesplay(data.petData))
.catch((error)=> console.log(error))

}

// pet details function 
const ShowDetailsOnDesplay = (petDetails) =>{
    // console.log(petDetails.date_of_birth)
    const detailsContainer = document.getElementById("modalContent");

    detailsContainer.innerHTML = `
    <img class="w-full rounded-xl" src="${petDetails.image}" />

    <h1 class="font-bold text-2xl my-4">${petDetails.pet_name} </h1>
    <div class="md:flex gap-5 mb-5"> 
        <div> 
            <h5 class="font-bold text-[16px] text-[#5a5a5a]"> <i class="text-[15px] mr-2 fas fa-paw text-2xl"></i> Breed: ${!petDetails.vaccinated_status ? "No info" : petDetails.vaccinated_status}</h5>
        <h5 class="font-bold text-[16px] text-[#5a5a5a]"> <i class="text-[15px] mr-2 fas fa-calendar-alt text-2xl"></i> Birth: ${petDetails.bdate_of_birth ? 'No info' : petDetails.date_of_birth} </h5>
        <h5 class="font-bold text-[16px] text-[#5a5a5a]"> <i class="text-[15px] mr-2 fas fa-mercury text-2xl"></i> Gender: ${!petDetails.gender ?"Fmale" : petDetails.gender}</h5> 
        </div>

        <div> 
        <h5 class="font-bold text-[16px] text-[#5a5a5a]"> <i class=" text-[15px] mr-2 fas fa-syringe text-2xl"></i>
 Gender: ${petDetails.vaccinated_status}</h5> 
        <h5 class="font-bold text-[16px] text-[#5a5a5a]"> <i class="text-[15px] mr-2 fas fa-dollar-sign text-2xl"></i> Price: ${!petDetails.price ? "No info" : petDetails.price}$</h5> 
        </div>
         </div> 

         <hr>

         <div class="mt-5">
         <h1 class="font-semibold mb-3">Details Information</h1>
         <p class="text-[#5a5a5a]">  ${petDetails.pet_details}</p>
         </div>

    `


    document.getElementById("displayDetails").click();
}

// pets image create start
const petsID = (id) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
.then((res) => res.json())
.then((data) => favouritesPets(data.petData))
.catch((error)=> console.log(error))
}

const favouritesPets = (data) => {
    // console.log(data.pet_details)

    const favouritesPetsContainer = document.getElementById("favourites_pet")
    const div = document.createElement('div');
    div.classList = ""
    div.innerHTML = `
    <div> 
    <div class=" h-[60px] md:h-auto overflow-hidden p-2">
    <img class="rounded-xl h-auto w-full object-cover" src="${data.image}"/>
    </div>
    </div>  
    `
    
    favouritesPetsContainer.appendChild(div)

}
// pets image create end
 


// creat display categories btn
function displayCategories(categories) {

    const categoriesBtn = document.getElementById("categores_btn");

    categories.forEach( (item) => {
        // console.log(item)

        // create a button for item
        const button = document.createElement('button');
        button.classList = 'w-40 lg:w-50 h-15 border-[#dbebec]';
        button.onclick = () => {show(item.category)} 
        button.innerHTML = 
        `
        <div id="btn-${item.category}" class="flex gap-5 p-6 btn remove-active hover:bg-[#5e8f8f]">
        <div class="w-8"><img src='${item.category_icon}'/> </div>
        <div><h4 class="font-bold text-[20px]"> ${item.category}</h4>
         </div>

        </div>
        `
        categoriesBtn.appendChild(button);
    });   
}

// active calss and descending order
const show = ( (num)=> {
    // alert(num)
    //  console.log(num)
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${num}`)
.then((res) => res.json())
.then((data) => {

    removeClass()

    const activeBtn = document.getElementById(`btn-${num}`)
    activeBtn.classList.add("active")
     //! sort by price working here for category pets descending order 
    document.getElementById("sortBtn").addEventListener("click",function(){
        const sorByPrice = data.data.sort((a,b) => b.price - a.price)
        displayPets(sorByPrice)
    })

        displayPets(data.data)})
.catch((error)=> console.log(error))
})

// class remove
const removeClass = () =>{
    const buttons = document.getElementsByClassName("remove-active");
    for (let btn of buttons) {
        
        btn.classList.remove("active")
    }
}

// * form input emty
const form = document.getElementById("Form");
const emailInput = document.getElementById("inputEmail");

form.addEventListener("submit", function(event){
    event.preventDefault();
    emailInput.value = "";
})


loadcategoriesBtn()
loadPets()