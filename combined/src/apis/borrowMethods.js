const BASE_URL_BORROWS = `${import.meta.env.VITE_INVENTORY_API_BASE_URL}/borrows`

export const getBorrows = async (email = undefined, returned = undefined, itemID = undefined) => {
    //const URLParams = resolveURLParams(email, returned, itemID) // Apply filter to search if necessary
    try {
        //const res = await fetch(`${BASE_URL_ITEMS}?` + new URLSearchParams(URLParams))
        const res = await fetch(`${BASE_URL_BORROWS}?`)
        if (!res.ok) {
            throw new Error(`HTTP ${res.status} ${res.statusText}`); // TODO: get error details in here
        }
        const borrows = await res.json()
        return(borrows)
    }
    catch (error) {
        console.error(error)
    }
}

// const resolveURLParams = (email, returned, itemID) => {
//     /* Filters by collection, if a query parameter has been provided */
//     let params = "";
//     if (typeof email == "boolean") {
//         params = { email: email.toString()}
//     }
//     return params
// }

export const deleteBorrow = async (borrowID) => {
    try {
        const res = await fetch(`${BASE_URL_BORROWS}/${borrowID}`, {method: 'DELETE'})
        if (!res.ok) {
            throw new Error(`HTTP ${res.status} ${res.statusText}`); // TODO: get error details in here
        }
    }
    catch (error) {
        console.error(error)
    }
}

export const updateBorrow = async (borrowID, borrowDetails) => {
    try {
        const res = await fetch(`${BASE_URL_BORROWS}/${borrowID}`, {method: 'PATCH', headers: {"Content-Type": "application/json"}, body: JSON.stringify(borrowDetails)})
        if (!res.ok) {
            throw new Error(`HTTP ${res.status} ${res.statusText}`); // TODO: get error details in here
        }
    }
    catch (error) {
        console.error(error)
    }
}