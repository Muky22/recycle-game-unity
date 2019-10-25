/*
witch (lastI)
                    {
                        case 0:
                            tag = "glass";
                            break;
                        case 1:
                            tag = "plastic";
                            break;
                        case 2:
                            tag = "organic";
                            break;
                        case 3:
                            tag = "paper";
                            break;
                        case 4:
                            tag = "mixed";
                            break;
                        case 5:
                            tag = "metal";
                            */

export interface Item {
  tag: string;
  correctAnswer: string;
  lang: string;
}

export class Items {
  static items: Item[] = [
    { tag: 'AppleHalf_01', correctAnswer: 'organic', lang: 'Polovica z jablka' },
    { tag: 'Apple_01', correctAnswer: 'organic', lang: 'Jablko' },
    { tag: 'Apple_02', correctAnswer: 'organic', lang: 'Jablko' },
    { tag: 'Axe_01', correctAnswer: 'metal', lang: 'Sekera' },
    { tag: 'Banana_01', correctAnswer: 'organic', lang: 'Banán' },
    { tag: 'Bandages_01', correctAnswer: 'paper', lang: 'Bandáž' },
    { tag: 'Bat_01', correctAnswer: 'organic', lang: 'Drevená pálka' },
    { tag: 'Bat_02', correctAnswer: 'metal', lang: 'Kovová pálka' },
    { tag: 'Baton_01', correctAnswer: 'plastic', lang: 'Obušok' },
    { tag: 'Beer_01', correctAnswer: 'glass', lang: 'Pivo' },
    { tag: 'Beer_02', correctAnswer: 'glass', lang: 'Pivo' },
    { tag: 'Beer_03', correctAnswer: 'glass', lang: 'Pivo' },
    { tag: 'Binoculars_01', correctAnswer: 'mixed', lang: 'Ďalekohľad' },
    { tag: 'Book_01', correctAnswer: 'paper', lang: 'Kniha' },
    { tag: 'Book_02', correctAnswer: 'paper', lang: 'Kniha' },
    { tag: 'Book_03', correctAnswer: 'paper', lang: 'Kniha' },
    { tag: 'Book_04', correctAnswer: 'paper', lang: 'Kniha' },
    { tag: 'BoomBox_01', correctAnswer: 'mixed', lang: 'Rádio' },
    { tag: 'BriefCase_01', correctAnswer: 'mixed', lang: 'Kufrík' },
    { tag: 'BriefCase_02', correctAnswer: 'mixed', lang: 'Kufrík' },
    { tag: 'BriefCase_03', correctAnswer: 'mixed', lang: 'Kufrík' },
    { tag: 'Bucket_01', correctAnswer: 'plastic', lang: 'Plastové vedro' },
    { tag: 'Bucket_02', correctAnswer: 'metal', lang: 'Železné vedro' },
    { tag: 'Bucket_03', correctAnswer: 'plastic', lang: 'Plastové Vedro' },
    { tag: 'Burger_01', correctAnswer: 'mixed', lang: 'Burger' },
    { tag: 'Cake_01', correctAnswer: 'mixed', lang: 'Koláč' },
    { tag: 'Cake_02', correctAnswer: 'mixed', lang: 'Koláč' },
    { tag: 'Camera_01', correctAnswer: 'mixed', lang: 'Kamera' },
    { tag: 'Carrot_01', correctAnswer: 'organic', lang: 'Mrkva' },
    { tag: 'Cash_01', correctAnswer: 'paper', lang: 'Bankovky' },
    { tag: 'Cash_02', correctAnswer: 'paper', lang: 'Bankovky' },
    { tag: 'Cash_03', correctAnswer: 'paper', lang: 'Bankovky' },
    { tag: 'ChainSaw_01', correctAnswer: 'mixed', lang: 'Motorová píla' },
    { tag: 'ChainSaw_02', correctAnswer: 'mixed', lang: 'Motorová píla' },
    { tag: 'ChainSaw_03', correctAnswer: 'mixed', lang: 'Motorová píla' },
    { tag: 'ChickenMeat_01', correctAnswer: 'organic', lang: 'Kuracie mäso' },
    { tag: 'Chiller_01', correctAnswer: 'mixed', lang: 'Prenosná chladnička' },
    { tag: 'Chiller_02', correctAnswer: 'mixed', lang: 'Prenosná chladnička' },
    { tag: 'Chiller_03', correctAnswer: 'mixed', lang: 'Prenosná chladnička' },
    { tag: 'ChocolateBar_01', correctAnswer: 'mixed', lang: 'Čokoláda' },
    { tag: 'ChocolateBar_02', correctAnswer: 'mixed', lang: 'Čokoláda' },
    { tag: 'ChocolateBar_03', correctAnswer: 'mixed', lang: 'Čokoláda' },
    { tag: 'Cigar_01', correctAnswer: 'mixed', lang: 'Cigára' },
    { tag: 'Cigar_02', correctAnswer: 'mixed', lang: 'Cigára' },
    { tag: 'Cigar_03', correctAnswer: 'mixed', lang: 'Cigára' },
    { tag: 'Cigar_04', correctAnswer: 'mixed', lang: 'Cigára' },
    { tag: 'Ciggie_01', correctAnswer: 'mixed', lang: 'Cigareta' },
    { tag: 'Ciggie_02', correctAnswer: 'mixed', lang: 'Cigareta' },
    { tag: 'Cleaver_01', correctAnswer: 'metal', lang: 'Sekáčik' },
    { tag: 'CoffeeCup_01', correctAnswer: 'glass', lang: 'Hrnček' },
    { tag: 'CoffeeCup_02', correctAnswer: 'glass', lang: 'Hrnček' },
    { tag: 'CoffeeCup_03', correctAnswer: 'glass', lang: 'Hrnček' },
    { tag: 'Coin_01', correctAnswer: 'metal', lang: 'Minca' },
    { tag: 'Coin_02', correctAnswer: 'metal', lang: 'Minca' },
    { tag: 'Cookie_01', correctAnswer: 'mixed', lang: 'Sušienka' },
    { tag: 'Corn_01', correctAnswer: 'organic', lang: 'Kukurica' },
    { tag: 'Corn_02', correctAnswer: 'organic', lang: 'Kukurica' },
    { tag: 'CrowBar_01', correctAnswer: 'metal', lang: 'Páčidlo' },
    { tag: 'CupCake_01', correctAnswer: 'mixed', lang: 'Koláčik' },
    { tag: 'CupCake_02', correctAnswer: 'mixed', lang: 'Koláčik' },
    { tag: 'CupCake_03', correctAnswer: 'mixed', lang: 'Koláčik' },
    { tag: 'Donut_01', correctAnswer: 'mixed', lang: 'Šiška' },
    { tag: 'Donut_02', correctAnswer: 'mixed', lang: 'Šiška' },
    { tag: 'Donut_03', correctAnswer: 'mixed', lang: 'Šiška' },
    { tag: 'Donut_04', correctAnswer: 'mixed', lang: 'Šiška' },
    { tag: 'Drill_01', correctAnswer: 'metal', lang: 'Vŕtačka' },
    { tag: 'Drill_02', correctAnswer: 'metal', lang: 'Vŕtačka' },
    { tag: 'Drill_03', correctAnswer: 'metal', lang: 'Vŕtačka' },
    { tag: 'EnergyCan_01', correctAnswer: 'plastic', lang: 'Plechovka' },
    { tag: 'EnergyCan_02', correctAnswer: 'plastic', lang: 'Plechovka' },
    { tag: 'FireAxe_01', correctAnswer: 'metal', lang: 'Požiarna sekera' },
    { tag: 'Flare_01', correctAnswer: 'mixed', lang: 'Svetlica' },
    { tag: 'Flare_02', correctAnswer: 'mixed', lang: 'Svetlica' },
    { tag: 'Flare_03', correctAnswer: 'mixed', lang: 'Svetlica' },
    { tag: 'FlashLight_01', correctAnswer: 'metal', lang: 'Baterka' },
    { tag: 'FryPan_01', correctAnswer: 'metal', lang: 'Panvica' },
    { tag: 'FuelCan_01', correctAnswer: 'metal', lang: 'Palivova nádrž' },
    { tag: 'GolfClub_01', correctAnswer: 'metal', lang: 'Golfová palica' },
    { tag: 'Hammer_01', correctAnswer: 'metal', lang: 'Kladivo' },
    { tag: 'Handbag_01 1', correctAnswer: 'mixed', lang: 'Kabelka' },
    { tag: 'Handbag_01', correctAnswer: 'mixed', lang: 'Kabelka' },
    { tag: 'Handbag_02', correctAnswer: 'mixed', lang: 'Kabelka' },
    { tag: 'Handbag_03', correctAnswer: 'mixed', lang: 'Kabelka' },
    { tag: 'Handbag_04', correctAnswer: 'mixed', lang: 'Kabelka' },
    { tag: 'Handbag_05', correctAnswer: 'mixed', lang: 'Kabelka' },
    { tag: 'Handbag_06', correctAnswer: 'mixed', lang: 'Kabelka' },
    { tag: 'HealthPack_01', correctAnswer: 'mixed', lang: 'Lekárnička' },
    { tag: 'HotDog_01', correctAnswer: 'mixed', lang: 'Párok v rohlíku' },
    { tag: 'IceBlock_01', correctAnswer: 'mixed', lang: 'Nanuk' },
    { tag: 'IceBlock_02', correctAnswer: 'mixed', lang: 'Nanuk' },
    { tag: 'IceBlock_03', correctAnswer: 'mixed', lang: 'Nanuk' },
    {
      tag: 'IceCreamSundae_01',
      correctAnswer: 'mixed',
      lang: 'Zmrzlinovy pohár',
    },
    { tag: 'IceCream_01', correctAnswer: 'mixed', lang: 'Zmrzlina' },
    { tag: 'IceCream_02', correctAnswer: 'mixed', lang: 'Zmrzlina' },
    { tag: 'IceCream_03', correctAnswer: 'mixed', lang: 'Zmrzlina' },
    { tag: 'Jam_01', correctAnswer: 'organic', lang: 'Džem' },
    { tag: 'Jam_02', correctAnswer: 'organic', lang: 'Džem' },
    { tag: 'Jam_03', correctAnswer: 'organic', lang: 'Džem' },
    { tag: 'Jam_04', correctAnswer: 'organic', lang: 'Džem' },
    { tag: 'KiwiFruit_01', correctAnswer: 'organic', lang: 'Kiwi' },
    { tag: 'Knife_01', correctAnswer: 'metal', lang: 'Nôž' },
    { tag: 'Knife_02', correctAnswer: 'metal', lang: 'Nôž' },
    { tag: 'Longboard_01', correctAnswer: 'mixed', lang: 'LongBoard' },
    { tag: 'Longboard_02', correctAnswer: 'mixed', lang: 'LongBoard' },
    { tag: 'Machete_01', correctAnswer: 'metal', lang: 'Mačeta' },
    { tag: 'MedicBox_01', correctAnswer: 'mixed', lang: 'Lekárnička' },
    { tag: 'MetalPipe_03', correctAnswer: 'metal', lang: 'Železná rúra' },
    { tag: 'MilkBottle_01', correctAnswer: 'glass', lang: 'Fľaša s mliekom' },
    { tag: 'MilkBottle_02', correctAnswer: 'glass', lang: 'Fľaša s mliekom' },
    { tag: 'MilkCarton_01', correctAnswer: 'SET_ME', lang: 'Krabica mlieka' },
    { tag: 'MilkCarton_02', correctAnswer: 'SET_ME', lang: 'Krabica mlieka' },
    { tag: 'Muffin_01', correctAnswer: 'mixed', lang: 'Mafin' },
    { tag: 'Muffin_02', correctAnswer: 'mixed', lang: 'Mafin' },
    { tag: 'Muffin_03', correctAnswer: 'mixed', lang: 'Mafin' },
    { tag: 'Needle_01', correctAnswer: 'plastic', lang: 'Injekcia' },
    { tag: 'NewsPaper_01', correctAnswer: 'SET_ME', lang: 'Noviny' },
    { tag: 'PaperBottle_01', correctAnswer: 'SET_ME', lang: 'Papierová fľaša' },
    { tag: 'PaperBottle_02', correctAnswer: 'SET_ME', lang: 'Papierová fľaša' },
    { tag: 'Pie_01', correctAnswer: 'mixed', lang: 'Koláč' },
    { tag: 'Pie_02', correctAnswer: 'mixed', lang: 'Koláč' },
    { tag: 'Pie_03', correctAnswer: 'mixed', lang: 'Koláč' },
    { tag: 'Pills_01', correctAnswer: 'plastic', lang: 'Nádoba na lieky' },
    { tag: 'Pills_02', correctAnswer: 'plastic', lang: 'Nádoba na lieky' },
    { tag: 'Pipe_01', correctAnswer: 'metal', lang: 'Fajka' },
    { tag: 'Pipe_02', correctAnswer: 'metal', lang: 'Fajka' },
    { tag: 'Pizza_01', correctAnswer: 'mixed', lang: 'Pizza' },
    { tag: 'Plank_01', correctAnswer: 'organic', lang: 'Drevo' },
    {
      tag: 'PlasticCoffeeCup_01',
      correctAnswer: 'plastic',
      lang: 'Plastový pohár',
    },
    {
      tag: 'PlasticCoffeeCup_02',
      correctAnswer: 'plastic',
      lang: 'Plastový pohár',
    },
    { tag: 'Plunger_01', correctAnswer: 'mixed', lang: 'Záchodový zvon' },
    { tag: 'PopCorn_01', correctAnswer: 'mixed', lang: 'PopCorn' },
    {
      tag: 'RolledPaper_01',
      correctAnswer: 'paper',
      lang: 'Zrolovaný papier',
    },
    { tag: 'Sandwich_01', correctAnswer: 'mixed', lang: 'Sendvič' },
    { tag: 'ScrewDriver_01', correctAnswer: 'metal', lang: 'Skrutkovač' },
    { tag: 'ScrewDriver_02', correctAnswer: 'metal', lang: 'Skrutkovač' },
    { tag: 'ScrewDriver_03', correctAnswer: 'metal', lang: 'Skrutkovač' },
    { tag: 'Skateboard_01', correctAnswer: 'mixed', lang: 'Skateboard' },
    { tag: 'SledgeHammer_01', correctAnswer: 'metal', lang: 'Kladivo' },
    { tag: 'SmartPhone_01', correctAnswer: 'mixed', lang: 'Smartfón' },
    { tag: 'SmartPhone_02', correctAnswer: 'mixed', lang: 'Smartfón' },
    { tag: 'SmartPhone_03', correctAnswer: 'mixed', lang: 'Smartfón' },
    { tag: 'SmartPhone_04', correctAnswer: 'mixed', lang: 'Smartfón' },
    { tag: 'SmartPhone_05', correctAnswer: 'mixed', lang: 'Smartfón' },
    { tag: 'SmartPhone_06', correctAnswer: 'mixed', lang: 'Smartfón' },
    { tag: 'SmartPhone_07', correctAnswer: 'mixed', lang: 'Smartfón' },
    { tag: 'SmartPhone_08', correctAnswer: 'mixed', lang: 'Smartfón' },
    { tag: 'SodaCan_01', correctAnswer: 'plastic', lang: 'Plechovka' },
    { tag: 'SodaCan_02', correctAnswer: 'plastic', lang: 'Plechovka' },
    { tag: 'SodaCan_03', correctAnswer: 'plastic', lang: 'Plechovka' },
    { tag: 'Spade_01', correctAnswer: 'metal', lang: 'Rýľ' },
    { tag: 'Spanner_01', correctAnswer: 'metal', lang: 'Kĺuč' },
    { tag: 'Spatula_01', correctAnswer: 'metal', lang: 'Špachtľa' },
    { tag: 'SportsBag_01', correctAnswer: 'mixed', lang: 'Športová taška' },
    { tag: 'SportsBag_02', correctAnswer: 'mixed', lang: 'Športová taška' },
    { tag: 'SportsBag_03', correctAnswer: 'mixed', lang: 'Športová taška' },
    { tag: 'SteakMeat_01', correctAnswer: 'organic', lang: 'Steak' },
    { tag: 'StrawCup_01', correctAnswer: 'plastic', lang: 'Plastový pohár' },
    { tag: 'StrawCup_02', correctAnswer: 'plastic', lang: 'Plastový pohár' },
    { tag: 'Sword_01', correctAnswer: 'metal', lang: 'Meč' },
    { tag: 'Tablet_01 1', correctAnswer: 'mixed', lang: 'Tablet' },
    { tag: 'Tablet_01', correctAnswer: 'mixed', lang: 'Tablet' },
    { tag: 'Tablet_02', correctAnswer: 'mixed', lang: 'Tablet' },
    { tag: 'Tablet_03', correctAnswer: 'mixed', lang: 'Tablet' },
    { tag: 'Taco_01', correctAnswer: 'mixed', lang: 'Taco' },
    { tag: 'ToolBox_01', correctAnswer: 'mixed', lang: 'Box s náradím' },
    { tag: 'ToolBox_02', correctAnswer: 'mixed', lang: 'Box s náradím' },
    { tag: 'ToolBox_03', correctAnswer: 'mixed', lang: 'Box s náradím' },
    { tag: 'WalkieTalkie_01', correctAnswer: 'mixed', lang: 'Vysielačka' },
    { tag: 'WalkieTalkie_02', correctAnswer: 'mixed', lang: 'Vysielačka' },
    { tag: 'WalkieTalkie_03', correctAnswer: 'mixed', lang: 'Vysielačka' },
    {
      tag: 'WalkingStick_01',
      correctAnswer: 'metal',
      lang: 'Palica na chodenie',
    },
    { tag: 'WaterBottle_01', correctAnswer: 'plastic', lang: 'Plastová fľaša' },
    { tag: 'WaterBottle_02', correctAnswer: 'plastic', lang: 'Plastová fľaša' },
    { tag: 'Weight_01', correctAnswer: 'metal', lang: 'Závažie' },
    { tag: 'Weight_02', correctAnswer: 'metal', lang: 'Závažie' },
    { tag: 'Wine_01', correctAnswer: 'glass', lang: 'Víno' },
    { tag: 'Wine_02', correctAnswer: 'glass', lang: 'Víno' },
    { tag: 'Wine_03', correctAnswer: 'glass', lang: 'Víno' },
    { tag: 'WoodPlank_01', correctAnswer: 'organic', lang: 'Drevená doska' },
    { tag: 'Wrench_01', correctAnswer: 'metal', lang: 'Kľúč' },
  ];

  public static getRandomItem(socket): Item {
    if (socket.data.lastItem === undefined) {
      socket.data.lastItem = 0;
    } else {
      socket.data.lastItem++;
    }

    if (socket.data.lastItem > Items.items.length - 1) {
      socket.data.lastItem = Items.items.length - 1;
    }

    return Items.items[socket.data.lastItem];
  }
}
