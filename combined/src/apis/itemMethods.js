const BASE_URL_ITEMS = `${import.meta.env.VITE_INVENTORY_API_BASE_URL}/items`

export const getItems = async (collection = undefined) => {
    const URLParams = resolveURLParams(collection) // Apply filter to search if necessary
    try {
        const res = await fetch(`${BASE_URL_ITEMS}?` + new URLSearchParams(URLParams))
        if (!res.ok) {
            throw new Error(`HTTP ${res.status} ${res.statusText}`); // TODO: get error details in here
        }
        const items = await res.json()
        return(items)
    }
    catch (error) {
        console.error(error)
    }
}

const resolveURLParams = (coll) => {
    /* Filters by collection, if a query parameter has been provided */
    let params = "";
    if (typeof coll == "boolean") {
        params = { collection: coll.toString()}
    }
    return params
}

export const deleteItem = async (qrCode) => {
    try {
        const res = await fetch(`${BASE_URL_ITEMS}/${qrCode}`, {method: 'DELETE'})
        if (!res.ok) {
            throw new Error(`HTTP ${res.status} ${res.statusText}`); // TODO: get error details in here
        }
    }
    catch (error) {
        console.error(error)
    }
}

export const updateItem = async (qrCode, itemDetails) => {
    try {
        const res = await fetch(`${BASE_URL_ITEMS}/${qrCode}`, {method: 'PATCH', headers: {"Content-Type": "application/json"}, body: JSON.stringify(itemDetails)})
        if (!res.ok) {
            throw new Error(`HTTP ${res.status} ${res.statusText}`); // TODO: get error details in here
        }
    }
    catch (error) {
        console.error(error)
    }
}