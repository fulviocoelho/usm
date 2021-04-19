class Random{
    constructor(){
        this.first_name = [
            "Matilda",
            "Irma",
            "Danna",
            "Toney",
            "Roselee",
            "Thu",
            "Alecia",
            "Rebekah",
            "Kathryn",
            "Shad",
            "Thora",
            "Freida",
            "Gail",
            "Maryellen",
            "Chantal",
            "Kanesha",
            "Ling",
            "Cortez",
            "Fredda",
            "Dixie",
            "Nereida",
            "Mable",
            "Serita",
            "Merrie",
            "Lon",
            "Ta",
            "Mendy",
            "Teresita",
            "Carma",
            "Adriene",
            "Teena",
            "Mckenzie",
            "Megan",
            "Juan",
            "Margherita",
            "Lincoln",
            "Timika",
            "Rodrigo",
            "Chelsea",
            "Hedy",
            "Charley",
            "Masako",
            "Rayna",
            "Holly",
            "Dayle",
            "Brook",
            "Janene",
            "Chas",
            "Penni",
            "Erma"
        ]
        this.last_name = [
            "Shaffer",
            "Rich",
            "Scott",
            "Nolan",
            "Hendrix",
            "Randolph",
            "Bautista",
            "Rangel",
            "Woodard",
            "Chung",
            "Briggs",
            "Richards",
            "Wilkins",
            "Ali",
            "Clarke",
            "Acosta",
            "Pena",
            "Foley",
            "Chang",
            "Reid",
            "Tanner",
            "Solis",
            "Mullen",
            "Mosley",
            "Coleman",
            "Sharp",
            "Swanson",
            "Ellison",
            "Mckay",
            "Klein",
            "Mcdowell",
            "Mcneil",
            "Moran",
            "Robbins",
            "Madden",
            "Salas",
            "Wang",
            "Bowen",
            "Mueller",
            "Berg",
            "Flynn",
            "Dickerson",
            "Mora",
            "Stein",
            "Dodson",
            "Wagner",
            "Chaney",
            "Thompson",
            "Calhoun",
            "Adkins"
        ]
        this.items = [
            "twister",
            "television",
            "remote",
            "doll",
            "washing machine",
            "vase",
            "sharpie",
            "cup",
            "sofa",
            "carrots",
            "seat belt",
            "chair",
            "spoon",
            "buckel",
            "clay pot",
            "picture frame",
            "bag",
            "fork",
            "candle",
            "paper",
            "chalk",
            "toilet",
            "rug",
            "bow",
            "model car",
            "sponge",
            "glasses",
            "outlet",
            "toothpaste",
            "lace",
            "grid paper",
            "slipper",
            "twezzers",
            "tooth picks",
            "stop sign",
            "sun glasses",
            "phone",
            "cat",
            "rusty nail",
            "bread",
            "knife",
            "house",
            "drawer",
            "leg warmers",
            "shawl",
            "truck",
            "lotion",
            "teddies",
            "coasters",
            "table"
        ]
    }
    firstname(){
        let fn = Math.round(Math.random() * 49)
        return this.first_name[fn];
    }
    lastname(){
        let ln = Math.round(Math.random() * 49)
        return this.last_name[ln];
    }
    fullname(){
        let fn = Math.round(Math.random() * 49)
        let ln = Math.round(Math.random() * 49)
        return `${this.first_name[fn]} ${this.last_name[ln]}`;
    }
    ritems(){
        let i = Math.round(Math.random() * 49)
        return this.items[i];
    }
    date(){
        let d = Math.ceil(Math.random() * 30)
        let m = Math.ceil(Math.random() * 12)
        let y = Math.round(Math.random() * 20)
        return `${d < 10 ? '0'+d : d}/${m < 10 ? '0'+m : m}/20${y < 10 ? '0'+y : y}`;
    }
    money(local,currency){
        let v = Math.random() * 100000
        v = new Intl.NumberFormat(local == null ? 'pt-BR':local, { style: 'currency', currency: currency == null ? 'BRL':currency }).format(v)
        return v;
    }
    time(){
        let h = Math.round(Math.random() * 12)
        let m = Math.round(Math.random() * 59)
        let a = Math.round(Math.random() * 2)
        return `${h < 10 ? '0'+h:h}:${m < 10 ? '0'+m:m} ${a == 1 ? 'AM':'PM'}`;
    }
}

module.exports = Random