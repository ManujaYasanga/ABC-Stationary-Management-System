import axios from "axios";
const BASE_API = axios.create({ baseURL: "http://127.0.0.1:5000" });

async function AddItemAPI({ id, name, qty, unit_price, description }) {
    return await BASE_API.post("/item/add-item", {
        id, name, qty, unit_price, description
    })
};

async function EditItemAPI({id, name, unit_price, description}){
    return await BASE_API.put("/item/edit-item", {
        id, name, unit_price, description
    })
}

async function ViewStocksAPI({ id }) {
    return await BASE_API.get(`item/view-stocks/${id}`);
}

async function RemoveItemAPI({id}){
    return await BASE_API.delete(`item/remove-item/${id}`);
}

async function AddStockAPI({id, qty}) {
    return await BASE_API.put('item/add-stocks', {id, qty});
}

async function ReleaseStockAPI({id, qty}){
    return await BASE_API.put('item/release-stocks', {id, qty});
}

export { AddItemAPI, EditItemAPI, RemoveItemAPI, ViewStocksAPI, AddStockAPI, ReleaseStockAPI };

