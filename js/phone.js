const loadPhone = async (InputSearchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${InputSearchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll)
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones);

    // step- 1 jekhane card info gulo bosabo seta pailam 
    const phoneContainer = document.getElementById('phone-container')
    // clear phone container cards before adding new cards
    phoneContainer.textContent = ''


    // display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container')
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden')
    }
    else {
        showAllContainer.classList.add('hidden')
    }

    // console.log('is show all', isShowAll);
    //display only first 12 phones
    // phones = phones.slice(0, 12);

    // display only first 12 phones if not show all
    if (!isShowAll) {
        phones = phones.slice(0, 12)
    }

    phones.forEach(phone => {
        // console.log(phone);
        // step-2 create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
        // step-3 set inner html
        phoneCard.innerHTML = `
        <figure>
            <img src="${phone.image}" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
                <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
        // step-4  append child 
        phoneContainer.appendChild(phoneCard);
    })
    // hide loading spinner
    toggleLoadingSpinner(false);
}

// show details clicked and open modal
const showDetails = async (id) => {
    // console.log('clicked show details button', id);
    //load single phone data 
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    // console.log(data);
    const phone = data.data

    showPhoneDetails(phone)

}

// for modal
const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('show-details-phone-name');
    phoneName.innerText = phone.name;

    const showDetailsContainer = document.getElementById('show-detail-container');
    showDetailsContainer.innerHTML =`
        <img src="${phone.image}">
        <p>Storage: <span>${phone.mainFeatures?.storage}</span></p>
        <p>GPS: <span>${phone.others?.GPS}</span></p>
    `

        //show the modal
        show_details_modal.showModal()
}

// handle search button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll)
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

// handle show all 
const handleShowAll = () => {
    handleSearch(true);
}


// loadPhone()