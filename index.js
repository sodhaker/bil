const TelegramBot = require('node-telegram-bot-api');

var fs = require('fs');
var fanNom = '',
    savNomer = 1,
    savSon = 0,
    tjSon = 0,
    ball = 0,
    baho = 0,
    i = 0,
    a=0,
    k=0,
    check=false,
    testKont = false,
    minSavKont = false,
    myText='',
    options={},
    testFaylText=[],
    savBosh = [],
    savOxir = [],
    savTartib=[];

const testFayl = fs.readFileSync('TestFayli.txt','utf8').toString().split("\r\n");

const minSavFayl = fs.readFileSync('MinSavFayli.txt','utf8').toString().split("\r\n");

const token = '541205847:AAGe2AZbGJVTIxsqsBbCnKlxSgfcziD6zto';

const bot = new TelegramBot(token, {polling: true});

const KB = {
    test: 'Testlar',
    reyting: 'Reyting',
    min_sav: 'Minimum savollar',
    about: 'Biz haqimizda',
    yangilik: 'Yangiliklar',
    back: 'Ortga',
    aJav: 'A',
    bJav: 'B',
    cJav: 'C',
    dJav: 'D',
    natija: 'Natija'
};

bot.onText(/\/start/, (msg, match) => {
    sendAbout(msg, true)
});

bot.on('message', (msg) => {
    if ('1234567891011121314151617181920'.indexOf(msg.text.toString())>-1) {
        if (testKont) {
            sendTest(msg);
        } else if (minSavKont) {
            sendMinimumSavol(msg);
        }
    }
    switch (msg.text) {
        case KB.test:
            testKont = true;
            sendTestFile(msg.chat.id);
            break;
        case KB.min_sav:
            minSavKont = true;
            sendMinSavFile(msg.chat.id);
            break;
        case KB.about:
            sendAbout(msg, true);
            break;
        case KB.yangilik:
            sendYangilik(msg.chat.id);
            break;
        case KB.back:
            sendAbout(msg, false);
            break;
        case KB.reyting:
            sendReyting(msg.chat.id);
            break;
        case KB.aJav:
            if (testFaylText[2][savTartib[savNomer]]==='1') tjSon++;
            if (savNomer<savSon-1) {
                savNomer++;
                sendJavob(msg.chat.id);
            } else {
                sendNatija(msg.chat.id, msg.from.first_name);
            }
            break;
        case KB.bJav:
            if (testFaylText[2][savTartib[savNomer]]==='2') tjSon++;
            if (savNomer<savSon-1) {
                savNomer++;
                sendJavob(msg.chat.id);
            } else {
                sendNatija(msg.chat.id, msg.from.first_name);
            }
            break;
        case KB.cJav:
            if (testFaylText[2][savTartib[savNomer]]==='3') tjSon++;
            if (savNomer<savSon-1) {
                savNomer++;
                sendJavob(msg.chat.id);
            } else {
                sendNatija(msg.chat.id, msg.from.first_name);
            }
            break;
        case KB.dJav:
            if (testFaylText[2][savTartib[savNomer]]==='4') tjSon++;
            if (savNomer<savSon-1) {
                savNomer++;
                sendJavob(msg.chat.id);
            } else {
                sendNatija(msg.chat.id, msg.from.first_name);
            }
            break;
        case KB.natija:
            sendNatija(msg.chat.id, msg.from.first_name);
            break
    }
});

function sendYangilik(chatId) {
    var yangilikFayl = fs.readFileSync('Yangiliklar.txt','utf8').toString().split("\n");
    myText = '';
    i = 0;
    while (i < yangilikFayl.length - 1) {
        if (myText.length + yangilikFayl[i].length < 4000) {
            myText = myText + yangilikFayl[i] + '\n';
        } else {
            bot.sendMessage(chatId, myText);
            myText = '';
            i--
        }
        i++
    }
    bot.sendMessage(chatId, myText);
}

function sendTestFile(chatId) {
    myText ='Test savollari:\n';
    var myObjName =[],
        myObjValue =[],
        myObj={};
    for (i=0;i<testFayl.length;i++){
        myText=myText+'\n'+(i+1).toString()+') '+testFayl[i];
        myObjName.push(i+1);
        myObjValue.push((i+1).toString());
        myObj[myObjName[i]]=myObjValue[i];
    }
    options ={
        reply_markup: {
            resize_keyboard: true,
            //one_time_keyboard: true,
            keyboard: [Object.keys(myObj),[KB.reyting, KB.back]]
        }
    };
    bot.sendMessage(chatId, myText, options)
}

function sendTest(msg) {
    const testFaylName ='./Test/'+testFayl[msg.text-1]+'.txt';
    testFaylText = fs.readFileSync(testFaylName,'utf8').toString().split("\n");
    savBosh=[];
    savOxir=[];
    for(i = 0; i < testFaylText.length; i++) {
        if (testFaylText[i].indexOf('SS')>-1) savBosh.push(i+1);
    }
    for(i = 0; i < savBosh.length-1; i++) {
        savOxir.push(savBosh[i+1]-1);
    }
    savOxir.push(testFaylText.length);
    fanNom = testFaylText[0];
//testText massivini 1-elementini songa aylantirib o'qilyapti
    savSon = +testFaylText[1];
    savTartib = [];
    a = Math.floor((Math.random() * savSon));
    k = 1;
    check = true;
    savTartib.push(a);
    while(k < savSon) {
        check = true;
        for(i=0; i<savTartib.length; i++) {
            if(savTartib[i] === a) {
                check=false;
            }
        }
        if (check){
            savTartib.push(a);
            k++;
        }
        a = Math.floor((Math.random() * savSon));
    }
    savNomer =0;
    tjSon = 0;
    testKont = false;
    sendJavob(msg.chat.id);
}

function sendMinSavFile(chatId) {
    myText ='Minimum savollari:\n';
    var myObjName =[],
        myObjValue =[],
        myObj={};
    for (i=0;i<minSavFayl.length;i++){
        myText=myText+'\n'+(i+1).toString()+') '+minSavFayl[i];
        myObjName.push(i+1);
        myObjValue.push((i+1).toString());
        myObj[myObjName[i]]=myObjValue[i];
    }
    options ={
        reply_markup: {
            resize_keyboard: true,
            //one_time_keyboard: true,
            keyboard: [Object.keys(myObj),[KB.back]]
        }
    };
    bot.sendMessage(chatId, myText, options);
}

//function sendMinimumSavol(chatId, myIndex) {
function sendMinimumSavol(msg) {
    const minSavFaylName ='./MinSav/'+minSavFayl[msg.text-1]+'.txt';
    const minSavFaylText = fs.readFileSync(minSavFaylName,'utf8').toString().split("\n");
    myText ='';
    options ={
        reply_markup: {
            resize_keyboard: true,
            //one_time_keyboard: true,
            keyboard: [
                [KB.about, KB.yangilik],
                [KB.test, KB.min_sav]
            ]
        }
    };
    i=0;
    while (i<minSavFaylText.length-1) {
        if (myText.length + minSavFaylText[i].length < 4000) {
            myText = myText + minSavFaylText[i] + '\n';
        } else {
            bot.sendMessage(msg.chat.id, myText, options);
            myText = '';
            i--
        }
        i++
    }
    minSavKont=false;
    bot.sendMessage(msg.chat.id, myText, options);
}

function sendAbout(msg, about = true) {
    if (about) {
        myText = 'Assalomu aleykum xurmatli ' + msg.from.first_name +
            ' ushbu bot online usulda test bajarish va fanlardan bilimni oshirish uchun mo`ljallangan.\n' +
            '\nMuallif: Namangan shahar pedagogika kolleji informatika fani o`qituvchisi - Ibragimov Sodiqjon.\n' +
            '\nEmail: sodhaker@gmail.com, sodhaker@mail.ru\n' +
            '\nTel: +998972553470\n' +
            '\nUshbu botdan foydalanganingizdan mamnunmiz!';
    } else {
        myText = '\nUshbu botdan foydalanganingizdan mamnunmiz!';
    }
    bot.sendMessage(msg.chat.id, myText, {
        reply_markup: {
            resize_keyboard: true,
            //one_time_keyboard: true,
            keyboard: [
                [KB.about, KB.yangilik],
                [KB.test, KB.min_sav]
            ]
        }
    });
}

function sendJavob(chatId) {
    var testSavol = (savNomer+1).toString()+'-savol?\n';
    for (i = savBosh[savTartib[savNomer]]; i < savOxir[savTartib[savNomer]]; i++) testSavol=testSavol+'\n'+testFaylText[i];
    bot.sendMessage(chatId, testSavol,{
        reply_markup: {
            resize_keyboard: true,
            //one_time_keyboard: true,
            keyboard: [
                 [KB.aJav, KB.bJav, KB.cJav, KB.dJav],
                 [KB.natija]
            ]
            }
        })
}

function sendNatija(chatId, fromId) {
    ball =  100/savSon*tjSon;
    if (ball>=86) {
        baho = 5
    } else
    if (ball>=71) {
        baho = 4
    } else
    if (ball>=56) {
        baho = 3
    } else {
        baho = 2
    }
    myText ='Test natijasi: ';
    myText =myText +'\nFoydalanuvchi: '+fromId;
    myText =myText +'\nFan nomi: '+fanNom;
    myText =myText +'\nSavollar soni: '+(savSon).toString()+' ta';
    myText =myText +'\nTugri javoblar soni: '+(tjSon).toString()+' ta';
    myText =myText +'\nTuplangan ball: '+(ball).toString();
    myText =myText +'\nBaho: '+(baho).toString();
    testKont=false;
    const reytingText='Foydalanuvchi: '+fromId+'; Fan: '+fanNom+'; Ball: '+(ball).toString()+'\n';
    fs.appendFileSync('Reyting.txt', reytingText);
    bot.sendMessage(chatId, myText, {
        reply_markup: {
            resize_keyboard: true,
            //one_time_keyboard: true,
            keyboard: [
                [KB.about, KB.yangilik],
                [KB.test, KB.min_sav]
            ]
        }
    });
}

function sendReyting(chatId) {
    var reytingFayl = fs.readFileSync('Reyting.txt','utf8').toString().split('\n');
    options={
        reply_markup: {
            resize_keyboard: true,
            //one_time_keyboard: true,
            keyboard: [
                [KB.about, KB.yangilik],
                [KB.test, KB.min_sav]
            ]
        }
    };
    myText = '';
    i = 0;
    while (i < reytingFayl.length - 1) {
        if (myText.length + reytingFayl[i].length < 4000) {
            myText = myText + reytingFayl[i] + '\n';
        } else {
            bot.sendMessage(chatId, myText, options);
            myText = '';
            i--
        }
        i++
    }
    bot.sendMessage(chatId, myText, options);
    testKont =false;
}