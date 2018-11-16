/**
 * get 3 digits to determine win type
 */
let getWin = () => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let data;
            try {
                data = JSON.parse(xhttp.responseText);
            } catch(err) {
                console.log(err.message + " in " + xhttp.responseText);
                return;
            }
            setWin(data);
        }
    };

    xhttp.open("GET", "http://localhost:8080", true);
    xhttp.send();
};

/**
 * set win type from 3 digits and check if bonus or not
 * @param data
 * data: json data from server
 */
let setWin = (data) => {
    let symbol_images = [
        './images/Symbol_0.png',
        './images/Symbol_1.png',
        './images/Symbol_2.png',
        './images/Symbol_3.png',
        './images/Symbol_4.png',
        './images/Symbol_5.png',
    ];
    let num = [];
    if(data[3]) {//bonus
        document.getElementById('win_type').innerText = "Bonus";
        document.getElementById('bonus_image_box').style.display = "block";
        setTimeout(function() {
            document.getElementById('win_type').innerText = " ";
            document.getElementById('bonus_image_box').style.display = "none";
            getWin();
        },1000);
        document.getElementById('win_image_box').style.display = "none";
        document.getElementById('spin_btn').style.display = "none";
        
    } else {
        for(let i = 0; i < 3; i++) {
            num[i] = data[i];//135
        }

        //set win type title
        document.getElementById('win_type').innerText = checkWinType(num);//135

        let images = [document.getElementById('image_1'), document.getElementById('image_2'), document.getElementById('image_3')];
        document.getElementById('bonus_image_box').style.display = "none";
        document.getElementById('win_image_box').style.display = "block";
        document.getElementById('spin_btn').style.display = "block";
        for(let j = 0; j < 3; j++) {
            images[j].setAttribute('src', symbol_images[num[j]]);
        }
    }

};

//determine type of win=> 3 digits are same: big win, if 2 are same, small win, otherwise no win
let checkWinType = (num) => {
    let num_array;  //1
    num_array = num.filter(x => x === num[0]);//x = [1,3,5] === 1
    if(num_array.length === 3) {
        return "Big Win";
    } else if(num_array.length === 2) {
        return "Small Win";
    } else {
        num_array = num.filter(x => x === num[1]); /// 
        if(num_array.length === 2) {
            return "Small Win";
        } else {
            return "No Win";
        }
    }
};