const html = `
<div class="product">
    <div>
        <div class="id">ID:{{id}}</div>
        <div class="client">{{client}}</div>
        <div class="clientSurname">{{client2}}</div>
        <div class="money">{{money}} Eur</div>
    </div>
    <div>
        <button type="button" value="{{id}}" class="green --plus">Pridėti lėšų</button>
        <button type="button" value="{{id}}" class="yellow --minus">Nuskaičiuoti lėšas</button>
        <button type="button" value="{{id}}" class="red --delete">Ištrinti</button>
    </div>
</div>
`;



window.addEventListener('load', _ => {


    const LAST_ID_LS = 'clientsLastSavedId';
    const CLIENTS_LS = 'clientsList';
    let destroyId = 0;
    let updateId = 0;

    const listHtml = document.querySelector('.--list');
    const closeButtons = document.querySelectorAll('.--close');
    const createButton = document.querySelector('.--create');

    // // create
    const createModal = document.querySelector('.modal--create');
    const storeButton = createModal.querySelector('.--submit');
    

    // // delete
    const deleteModal = document.querySelector('.modal--delete');
    const deleteButton = deleteModal.querySelector('.--submit');

    // // edit
    const editModal1 = document.querySelector('.modal--edit1');
    const updateButton = editModal1.querySelector('.--plus');

    // const editModal2 = document.querySelector('.modal--edit2');
    // const updateButton2 = editModal2.querySelector('.--submit');

    const getId = _ => {
        const id = localStorage.getItem(LAST_ID_LS);
        if (null === id) {
            localStorage.setItem(LAST_ID_LS, 1);
            return 1;
        }
        localStorage.setItem(LAST_ID_LS, parseInt(id) + 1);
        return parseInt(id) + 1;
    }
    
    const write = data => {
        localStorage.setItem(CLIENTS_LS, JSON.stringify(data));
    }
    
    const read = _ => {
        const data = localStorage.getItem(CLIENTS_LS);
        if (null === data) {
            return [];
        }
        return JSON.parse(data);
    }

    const storeData = data => {
        const storeData = read();
        data.id = getId();
        storeData.push(data);
        write(storeData);
    }

    const destroyData = id => {
        const data = read();
        const deleteData = data.filter(c => c.id !== id);
        write(deleteData);
    }

    const updateData = (id, data) => {
        const updateData = read().map(p => p.id == id ? {...data, id} : p);
        write(updateData);
    }

// LS functions



// DOM
    
    const showModal = modal => modal.style.display = 'flex';

    const hideModal = modal => {
        modal.querySelectorAll('[name]').forEach(i => {
            i.value = '';
        });
        modal.style.display = 'none';
    }

    const showList = _ => {
        let clientsHtml = '';
        read().forEach(c => {
            let temp = html;
            temp = temp.replaceAll('{{id}}', c.id);
            temp = temp.replaceAll('{{client}}', c.clientName);
            temp = temp.replaceAll('{{client2}}', c.clientSurname);
            temp = temp.replaceAll('{{money}}', c.clientMoney);
            clientsHtml += temp;
        });
        listHtml.innerHTML = clientsHtml;
        registerDelete();
        registerEdit1();
        // registerEdit2();
    }

    const prepareDeleteModal = id => {
        const title = read().find(c => c.id == id).clientSurname;
        deleteModal.querySelector('.client--clientSurname').innerText = title;
    }

    const prepareEditModal1 = id => {
        const product = read().find(c => c.id == id);
        editModal1.querySelectorAll('[clientSurname]').forEach(i => {
            i.value = product[i.getAttribute('clientSurname')];
        });
    }

    // const prepareEditModal2 = id => {
    //     const product = read().find(c => c.id == id);
    //     editModal2.querySelectorAll('[name]').forEach(i => {
    //         i.value = product[i.getAttribute('name')];
    //     });
    // }

    const getDataFromForm = form => {
        const data = {};
        form.querySelectorAll('[name]').forEach(i => {
            data[i.getAttribute('name')] = i.value;
        });
        return data;
    }

    const store = _ => {
        const data = getDataFromForm(createModal);  // CRUD
        storeData(data);  // LS
        hideModal(createModal);  // DOM
        showList();  // DOM
    }

    const destroy = _ => {
        destroyData(destroyId);  // LS
        hideModal(deleteModal);  // DOM
        showList();  //DOM
    }

    const update = _ => {
        const data = getDataFromForm(editModal1);
        updateData(updateId, data);
        hideModal(editModal1);
        showList();
    }

    // const update2 = _ => {
    //     const data = getDataFromForm(editModal2);
    //     updateData(updateId, data);
    //     hideModal(editModal2);
    //     showList();
    // }

    const registerDelete = _ => {
        document.querySelectorAll('.--delete').forEach(b => {
            b.addEventListener('click', _ => {
                showModal(deleteModal);
                prepareDeleteModal(parseInt(b.value));
                destroyId = parseInt(b.value);
            });
        });
    }

    const registerEdit1 = _ => {
        document.querySelectorAll('.--edit1').forEach(b => {
            b.addEventListener('click', _ => {
                showModal(editModal1);
                prepareEditModal1(parseInt(b.value));
                updateId = parseInt(b.value);
            });
        });
    }

    // const registerEdit2 = _ => {
    //     document.querySelectorAll('.--edit2').forEach(b => {
    //         b.addEventListener('click', _ => {
    //             showModal(editModal2);
    //             prepareEditModal2(parseInt(b.value));
    //             updateId = parseInt(b.value);
    //         });
    //     });
    // }

    // const devButton = document.querySelector('.seed');
    // devButton.addEventListener('click', _ => {
    //     seed();
    //     showList();
    // });


    closeButtons.forEach(b => {
        b.addEventListener('click', _ => {
            hideModal(b.closest('.--modal'));
        });
    });

    createButton.addEventListener('click', _ => showModal(createModal));

    storeButton.addEventListener('click', _ => store());

    deleteButton.addEventListener('click', _ => destroy());

    updateButton.addEventListener('click', _ => update());

    // updateButton2.addEventListener('click', _ => update2());

    


    

    setTimeout(_ => showList(), 2000);


});

// const seedData = [
    //     {id: 1, clientName: 'Klevas', clientSurname: 'Auksaspalvis', clientMoney: '1425 '},
    //     {id: 2, clientName: 'Raudė', clientSurname: 'Ežeraitė', clientMoney: '703 '},
    //     {id: 3, clientName: 'Ruduo', clientSurname: 'Gelsvalapis', clientMoney: '15 '},
    //     {id: 4, clientName: 'Zylė', clientSurname: 'Gražiasparnė', clientMoney: '489 '},
    //     {id: 5, clientName: 'Braškė', clientSurname: 'Obelaitė', clientMoney: '2541 '},
    //     {id: 6, clientName: 'Bazilikas', clientSurname: 'Ožekšnis', clientMoney: '57 '},
    //     {id: 7, clientName: 'Smidras', clientSurname: 'Paprikėnas', clientMoney: '984 '},
    //     {id: 8, clientName: 'Magnolija', clientSurname: 'Skardžiabalsienė', clientMoney: '8652 '},
    //     {id: 9, clientName: 'Kriaušė', clientSurname: 'Voveraitė', clientMoney: '698 '},
    //     {id: 10, clientName: 'Vilkas', clientSurname: 'Žuvėdrinis', clientMoney: '352 '},
    // ];

    

    // const seed = _ => {
    //     write(seedData);
    //     localStorage.setItem(LAST_ID_LS, 10);
    // }