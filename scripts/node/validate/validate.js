class Validate{

    notNull = (form) => {
        let valid
        for(let item of Object.values(form)){
            item !== null && item !== undefined && item !== '' ? valid !== false ? valid = true : false : valid = false  
        }
        return valid
    }

}

module.exports = Validate