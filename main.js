initializeApp();

const config = {
    title : document.getElementById("title"),
    step1 : document.getElementById("step1"),
    step2 : document.getElementById("step2"),
    step3 : document.getElementById("step3"),
    step4 : document.getElementById("step4"),
}

const battery =
    [{
        "batteryName": "WKL-78", //電池名
        "capacityAh": 2.3, // 容量（Ah）
        "voltage": 14.4, // 電圧
        "maxDraw": 3.2, // 最大放電電流（A）
        "endVoltage": 10, // 終止電圧
    },
    {
        "batteryName": "WKL-140",
        "capacityAh": 4.5,
        "voltage": 14.4,
        "maxDraw": 9.2,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-78",
        "capacityAh": 2.5,
        "voltage": 14.5,
        "maxDraw": 10,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-140",
        "capacityAh": 3.6,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 5,
    },
    {
        "batteryName": "IOP-E78",
        "capacityAh": 6.6,
        "voltage": 14.4,
        "maxDraw": 10.5,
        "endVoltage": 8,
    },
    {
        "batteryName": "IOP-E140",
        "capacityAh": 9.9,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 10,
    },
    {
        "batteryName": "IOP-E188",
        "capacityAh": 13.2,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C65",
        "capacityAh": 4.9,
        "voltage": 14.8,
        "maxDraw": 4.9,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C85",
        "capacityAh": 6.3,
        "voltage": 14.4,
        "maxDraw": 6.3,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C140",
        "capacityAh": 9.8,
        "voltage": 14.8,
        "maxDraw": 10,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C290",
        "capacityAh": 19.8,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 12,
    }]
;

const camera =
    [{
        "brand": "Cakon", // メーカー
        "model": "ABC 3000M", // 製品名
        "powerConsumptionWh": 35.5, // 消費電力（Wh ワット時間）
    },
    {
        "brand": "Cakon",
        "model": "ABC 5000M",
        "powerConsumptionWh": 37.2,
    },
    {
        "brand": "Cakon",
        "model": "ABC 7000M",
        "powerConsumptionWh": 39.7,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9000M",
        "powerConsumptionWh": 10.9,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9900M",
        "powerConsumptionWh": 15.7,
    },
    {
        "brand": "Go MN",
        "model": "UIK 110C",
        "powerConsumptionWh": 62.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 210C",
        "powerConsumptionWh": 64.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 230C",
        "powerConsumptionWh": 26.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 250C",
        "powerConsumptionWh": 15.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 270C",
        "powerConsumptionWh": 20.3,
    },
    {
        "brand": "VANY",
        "model": "CEV 1100P",
        "powerConsumptionWh": 22,
    },
    {
        "brand": "VANY",
        "model": "CEV 1300P",
        "powerConsumptionWh": 23,
    },
    {
        "brand": "VANY",
        "model": "CEV 1500P",
        "powerConsumptionWh": 24,
    },
    {
        "brand": "VANY",
        "model": "CEV 1700P",
        "powerConsumptionWh": 25,
    },
    {
        "brand": "VANY",
        "model": "CEV 1900P",
        "powerConsumptionWh": 26,
    }]
;

// console.log(battery);
// console.log(camera);

class View{
    // Title 
    static displayTitle(){
        config.title.innerHTML = 
        `
        <h2 class="text-center text-white">Battery Finder Program</h2>
        `
        config.title.classList.add("col-12", "p-2", "bg-success");
    }

    // Step 1 and 2
    static displayStep1to2(){
        let brandArray = Control.selectBrand();
        let step1HTML = "";

        for(let i = 0; i < brandArray.length; i++){
            step1HTML +=
            `
            <option value="${brandArray[i]}">${brandArray[i]}</option>
            `
        }

        config.step1.innerHTML = 
        `
        <div class="p-3">
            <h5><label for="brand">step1: Select your brand</label></h5>
            <select id="brand" class="p-1 vw-50">
                ${step1HTML}
            </select>
        </div>
        `

        let step2HTML = "";

        for(let i = 0; i < camera.length; i++){
            if(camera[i]["brand"] == brandArray[0]){
                step2HTML += `<option value="${camera[i]["model"]}">${brandArray[0] + " " + camera[i]["model"]}</option>`;
            }
        }

        config.step2.innerHTML = 
        `
        <div class="p-3">
            <h5><label for="model">step2: Select your Model</label></h5>
            <select id="model" class="p-1 vw-50">
                ${step2HTML}
            </select>
        </div>
        `
    }

    // Step 3
    static displayStep3(){
        config.step3.innerHTML =
        `
        <div class="p-3">
            <h5><label for="power">step3: Input Accessory Power Consumption</label></h5>
            <input id="accessoryPowerConsumption" type="number" min="0" max="100" step="5" class="col-3" value="0">
            <label class="ml-2">W (0-100)</label>
        </div>
        `
    }

    // Step 4
    static displayStep4(){
        config.step4.innerHTML =
        `
        <div class="p-3">
            <h5><label for="battery">step4: Choose Your Battery</label></h5>
            <div id="batterySuggest">
                ${Control.batterySuggestion()}
            </div>
        </div>
        `
    }
}


class Control{
    // cameraのbrand情報を重複なく抜き出す
    // Step1
    static selectBrand(){
        let brands = [];
        for(let i = 0; i < camera.length; i++){
            if(brands.indexOf(camera[i]["brand"]) == -1) brands.push(camera[i]["brand"]);
        }
        // console.log(brands);
        return brands;
    }

    // brandを選んだら次の選択肢が絞られる
    // Step2
    static selectModel(){
        const selectAll = document.querySelectorAll("select");

        // selectAll[0] -> step1で選択されたもの
        selectAll[0].addEventListener("change", function(){
            let models;
            for(let i = 0; i < camera.length; i++){
                if(camera[i]["brand"] == selectAll[0].value){
                    models += 
                    `
                    <option value="${camera[i]["model"]}">${selectAll[0].value + " " + camera[i]["model"]}</option>
                    `

                    // selectAll[1] -> step2の中身
                    selectAll[1].innerHTML = "";
                    selectAll[1].innerHTML = models;
                }
            }
        })
    }

   // Step4
    static batterySuggestion(){
        let choices = [
          document.getElementById("brand"),
          document.getElementById("model"),
          document.getElementById('accessoryPowerConsumption'),
        ];

        for(let i = 0; i < choices.length; i++){
          choices[i].addEventListener("input", function(){
            let cameraPower = parseInt(choices[2].value);
            for(let i = 0; i < 1; i++){
            // 消費電力の合計値を求める (Input Accessory Power Consumption + 消費電力（Wh ワット時間）)
              if(camera[i]["model"] == choices[1].value) cameraPower += camera[i]["powerConsumptionWh"];
            }
            let buttons = Control.selectBattery(cameraPower);
            let buttonsHtml = "";
            for(let i = 0; i < buttons.length; i++){
                buttonsHtml += buttons[i];
            }
            let chosenBattery = document.getElementById("batterySuggest");
            chosenBattery.innerHTML = "";
            chosenBattery.innerHTML = buttonsHtml;
          })
        }
    }

    static selectBattery(cameraPower){
      let batteries = [];
      let batteryPower;
      for(let i = 0; i < battery.length; i++){
        // 終止電圧 × 最大放電電流 
        batteryPower = battery[i]["maxDraw"] * battery[i]["endVoltage"];
        // カメラの消費電力を上回るように
        if(batteryPower >= cameraPower){
          let duration = Math.floor(battery[i]["capacityAh"] * battery[i]["voltage"] / cameraPower * 10) / 10;
            batteries.push(
                `
                <button class="btn btn-light bg-white border rounded-0 w-100 d-flex justify-content-between align-items-center">
                    <h6 class="m-2">${battery[i]["batteryName"]}</h6>
                    <p class="m-2">Estimated ${duration} hours on selected setup</p>
                </button>
                `
            )
        }
      }
      console.log(batteryPower);
      console.log(cameraPower);

      batteries.sort();
      return batteries;
    }
}

function initializeApp(){
    const target = document.getElementById("target");
    target.innerHTML = 
    `
    <div class="container bg-light">
        <div class="row">
            <div id="title"></div>
        </div>
        <div class="row">
            <div id="step1"></div>
        </div>
        <div class="row">
            <div id="step2"></div>
        </div>
        <div class="row">
            <div id="step3"></div>
        </div>
        <div id="step4"></div>
    </div>
    `
}

View.displayTitle();
View.displayStep1to2();
Control.selectModel();
View.displayStep3();
View.displayStep4();
Control.batterySuggestion();