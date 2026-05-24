import coverImage from "@/UI/images/MaliceMizer/memoire.jpg"
export default {
    release: {
        title:"memoire",
        info: {
            coverImage,
            rows: [
                ["Type of Release", "Full Album"],
                ["Date of Release", "July 24, 1994"],
                ["Number of Tracks", "6 (7 on memoire DX)"],
                ["Item Number", "M:N 001"],
                ["Retail Price", "3000JPY"],
            ],
            columnHeader: true,
            rowHeader: false,
        },
        tracklist: {
            headers: ["Track Number", "Name", "Romaji","Video","Lyrics"],
            tracks: [[1, "de memoire", "", "", "y"],
            [2, "記憶と空", "Kioku to sora", "","y"],
            [3, "エーゲ海に捧ぐ", "E-ge umi ni sasagu", "", "n"],
            [4, "午後のささやき", "Gogo no sasayaki", "", "n"],
            [5, "魅惑のローマ", "Miwaku no ro-ma", "", "n"],
            [6, "seraph", "", "", "n"],
            [7, "バロッケ", "Baroque", "", "n"],],
            columnHeader: false,
            rowHeader: true,
        },
        lyrics:{
            track1:{
                credits:{
                    words:["tetsu"],
                    music:["mana"]
                },
                original:["何度も繰り返し奏でられる旋律が"],
                romaji:["Nando mo kurikaeshi kanaderareru senritsu ga"],
                translation:["The melody that is played over and over again"]
            },
            track2:{
                credits:{
                    words:"tetsu",
                    music:"mana"
                },
                original:["視線の風は僕の額に穴を開けたまま","この世界にずっと吹き荒れる","Erase all with only light, leave me without delight",
                          "人は無名のまま 皆消えて行く…","わめき すすり泣き あえぐ声 それらを遮る様に","押しつつみ広がる silence",
                        "初めて死を意識したあの幼い日を思いながら","光を避けた僕は一人怯えた部屋に取り憑かれている", 
                        "世界から全ての色が 無くなる日を…","君との再会の時 殺したいと思うだろうか？","抱きたいと思うだろうか？", 
                        "抱き締めた記憶と空","言葉より気持ちより目の前のあなただけ","懐かしい記憶と今 眼が眩む 足が竦む 骨が軋む 骨が震える"],
                romaji:["Shisen no kaze wa boku no gaku ni ana wo aketa mama","Kono sekai ni zutto fukiareru","Erase all with only light, leave me without delight",
                    "Hito no mumei no mama minna kieteiku...", "Wameki susuri naki aegu koe sore wo saegiru you ni",
                    "Oshitsutsumi hirogaru silence","Hajimete shi o ishikishita ano osanai hi wo omoinagara","Hikari wo saketa boku wa hitori obieta heya ni toritsukareteiru",
                    "Sekai kara subete no iro ga nakunaru hi wo...","Kimi to no saikai no toki koroshitai to omou darou ka?","Dakitai to omou darou ka?",
                    "Dakishimeta kioku to sora", "Kotoba yori kimochi yori me no mae no anata dake","Natsukashii kioku to ima me ga kuramu ashi ga sukumu hone ga furueru"],
                translation:["The wind of their glances has opened a hole in my forehead","Violently blowing in this world","Erase all with only light, leave me without delight",
                    "Hito no mumei no mama minna kieteiku...", "Wameki susuri naki aegu koe sore wo saegiru you ni",
                    "Oshitsutsumi hirogaru silence","Hajimete shi o ishikishita ano osanai hi wo omoinagara","Hikari wo saketa boku wa hitori obieta heya ni toritsukareteiru",
                    "Sekai kara subete no iro ga nakunaru hi wo...","Kimi to no saikai no toki koroshitai to omou darou ka?","Dakitai to omou darou ka?",
                    "Dakishimeta kioku to sora", "Kotoba yori kimochi yori me no mae no anata dake","Natsukashii kioku to ima me ga kuramu ashi ga sukumu hone ga furueru"]
            },
            track3:{
                credits:{
                    words:["tetsu"],
                    music:["mana"]
                },
                original:[""],
                romaji:[""],
                translation:[""]
            },
            track4:{
                credits:{
                    words:["tetsu"],
                    music:["mana"]
                },
                original:[""],
                romaji:[""],
                translation:[""]
            },
            track5:{
                credits:{
                    words:["tetsu"],
                    music:["mana"]
                },
                original:[""],
                romaji:[""],
                translation:[""]
            },
            track6:{
                credits:{
                    words:["tetsu"],
                    music:["mana"]
                },
                original:[""],
                romaji:[""],
                translation:[""]
            }
        }
    },
}