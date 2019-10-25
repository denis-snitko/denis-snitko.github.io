const form = $('#price-form');

let formData = form.serializeJSON();

let pagesUniquePrice = $('[data-price="pagesUniquePrice"]').text(); // уникальные страницы
let pagesGeneralPrice = $('[data-price="pagesGeneralPrice"]').text(); // типовые страницы
let sectionsPrice = $('[data-price="sectionsPrice"]').text(); // количество секций в лендинге
let carouselPrice = $('[data-price="carouselPrice"]').text(); // количество каруселей и слайдеров
let modalsPrice = $('[data-price="modalsPrice"]').text(); // количество модальных окон
let formsPrice = $('[data-price="formsPrice"]').text(); // количество форм

showHideBlocks();

form.on('keyup change paste', 'input, select, textarea', function () {
    formData = form.serializeJSON();

    showHideBlocks();
    formData = form.serializeJSON();

    calculatePrice();
    updatePrice(calculatePrice());
});

// Функции
function showHideBlocks() {
    if (formData.type == 'site') {
        $('[data-name="pages"]').show();
        $('[data-name="landing"]').hide();
        $('[name="sections"]').val('0');

    } else {
        $('[data-name="pages"]').hide();
        $('[data-name="landing"]').show();
        $('[data-name="pages"] input').val('0');
    }

    if (formData.mobile == 'on') {
        $('[data-name="mobile"]').show();
    } else {
        $('[data-name="mobile"]').hide();
        $('[name="mobile-number"]')[0].checked = true;
        $('[name="mobile-number"]')[1].checked = false;
        $('[name="mobile-number"]')[2].checked = false;
    }
}

function calculatePrice() {
    //Стоимость и ценник
    let totalPrice = 0;
    totalPrice =
        formData['pages-unique'] * pagesUniquePrice +
        formData['pages-general'] * pagesGeneralPrice +
        formData['sections'] * sectionsPrice +
        formData['carousel'] * carouselPrice +
        formData['modals'] * modalsPrice +
        formData['forms'] * formsPrice;

    //Мобильный мультипликатор
    let multiplicatorMobile = 1;
    if (formData['mobile-number'] == 2) {
        multiplicatorMobile = 1.3;
    } else if (formData['mobile-number'] == 3) {
        multiplicatorMobile = 1.5;
    }

    //PixelPerfect мультипликатор
    let mPixelPerfect = 1;
    if (formData['pixelPerfect'] == 'on') {
        mPixelPerfect = 1.2;
    }

    //Retina ready мультипликатор
    let mRetinaReady = 1;
    if (formData['retinaReady'] == 'on') {
        mRetinaReady = 1.2;
    }

    //googlePageSpeed мультипликатор
    let mGooglePageSpeed = 1;
    if (formData['googlePageSpeed'] == 'on') {
        mGooglePageSpeed = 1.2;
    }

    //Urgent Order мультипликатор
    let mUrgentOrder = 1;
    if (formData['urgentOrder'] == 'on') {
        mUrgentOrder = 1.5;
    }

    totalPrice =
        totalPrice *
        multiplicatorMobile *
        mPixelPerfect *
        mRetinaReady *
        mGooglePageSpeed *
        mUrgentOrder;

    return totalPrice;
}

function updatePrice(price) {
    $('#total-price').text(price);
}
