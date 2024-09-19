import fs, { writeFileSync } from 'fs'
import open from 'open'
import { resolve } from 'path';

function deleteKey() {
    delete dataArray.Like_List.ItemFavoriteList
    fs.writeFileSync(data_path, JSON.stringify(dataArray, null, 2) , 'utf-8');
}

async function extractFavoriteVideos() {
    for (var data of dataArray.Activity["Favorite Videos"].FavoriteVideoList) {
        console.log(data.Link)
        await new Promise(resolve => setTimeout(resolve, 1000))
        open(data.Link)
    }
}

async function extractFollowing() {
    for (var data of dataArray.Activity["Following List"].Following) {
        console.log(data.UserName)
        await new Promise(resolve => setTimeout(resolve, 1000))
        open("https://www.tiktok.com/@" + data.UserName)
    }
}

async function extractChats() {
    var history = dataArray["Direct Messages"]["Chat History"].ChatHistory
    var chats_path = 'result/chats.txt'

    writeFileSync(chats_path, "", { flag: "w" })

    for (var chat of Object.keys(history)) {
        if (chat.toString().includes(" "))
            writeFileSync(chats_path, " ======= " + chat.toString() + " ======= " + "\n", { flag: "a+" })
            for (var message of history[chat]) {
                // console.log(message.From + ": " + message.Content)
                writeFileSync(chats_path, message.From + ": " + message.Content + "\n", { flag: "a+" })
            }
            writeFileSync(chats_path, " ============== " + "\n", { flag: "a+" })
    }
}

var data_path = 'data/data.json'
var dataArray = JSON.parse(fs.readFileSync(data_path, 'utf-8'))

extractFollowing();
extractFavoriteVideos();
extractChats()

console.log(dataArray)
