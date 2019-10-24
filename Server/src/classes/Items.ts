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
    { tag: 'AppleHalf_01', correctAnswer: 'SET_ME', lang: 'Polovica z jablka' },
    { tag: 'Apple_01', correctAnswer: 'SET_ME', lang: 'Jablko' },
    { tag: 'Apple_02', correctAnswer: 'SET_ME', lang: 'Jablko' },
    { tag: 'Axe_01', correctAnswer: 'SET_ME', lang: 'Sekera' },
    { tag: 'Banana_01', correctAnswer: 'SET_ME', lang: 'Banán' },
    { tag: 'Bandages_01', correctAnswer: 'SET_ME', lang: 'Bandáž' },
    { tag: 'Bat_01', correctAnswer: 'SET_ME', lang: 'Drevená pálka' },
    { tag: 'Bat_02', correctAnswer: 'SET_ME', lang: 'Kovová pálka' },
    { tag: 'Baton_01', correctAnswer: 'SET_ME', lang: 'Obušok' },
    { tag: 'Beer_01', correctAnswer: 'SET_ME', lang: 'Pivo' },
    { tag: 'Beer_02', correctAnswer: 'SET_ME', lang: 'Pivo' },
    { tag: 'Beer_03', correctAnswer: 'SET_ME', lang: 'Pivo' },
    { tag: 'Binoculars_01', correctAnswer: 'SET_ME', lang: 'Ďalekohľad' },
    { tag: 'Book_01', correctAnswer: 'SET_ME', lang: 'Kniha' },
    { tag: 'Book_02', correctAnswer: 'SET_ME', lang: 'Kniha' },
    { tag: 'Book_03', correctAnswer: 'SET_ME', lang: 'Kniha' },
    { tag: 'Book_04', correctAnswer: 'SET_ME', lang: 'Kniha' },
    { tag: 'BoomBox_01', correctAnswer: 'SET_ME', lang: 'Rádio' },
    { tag: 'BriefCase_01', correctAnswer: 'SET_ME', lang: 'Kufrík' },
    { tag: 'BriefCase_02', correctAnswer: 'SET_ME', lang: 'Kufrík' },
    { tag: 'BriefCase_03', correctAnswer: 'SET_ME', lang: 'Kufrík' },
    { tag: 'Bucket_01', correctAnswer: 'SET_ME', lang: 'Vedro' },
    { tag: 'Bucket_02', correctAnswer: 'SET_ME', lang: 'Vedro' },
    { tag: 'Bucket_03', correctAnswer: 'SET_ME', lang: 'Vedro' },
    { tag: 'Burger_01', correctAnswer: 'SET_ME', lang: 'Burger' },
    { tag: 'Cake_01', correctAnswer: 'SET_ME', lang: 'Koláč' },
    { tag: 'Cake_02', correctAnswer: 'SET_ME', lang: 'Koláč' },
    { tag: 'Camera_01', correctAnswer: 'SET_ME', lang: 'Kamera' },
    { tag: 'Carrot_01', correctAnswer: 'SET_ME', lang: 'Mrkva' },
    { tag: 'Cash_01', correctAnswer: 'SET_ME', lang: 'Bankovky' },
    { tag: 'Cash_02', correctAnswer: 'SET_ME', lang: 'Bankovky' },
    { tag: 'Cash_03', correctAnswer: 'SET_ME', lang: 'Bankovky' },
    { tag: 'ChainSaw_01', correctAnswer: 'SET_ME', lang: 'Motorová píla' },
    { tag: 'ChainSaw_02', correctAnswer: 'SET_ME', lang: 'Motorová píla' },
    { tag: 'ChainSaw_03', correctAnswer: 'SET_ME', lang: 'Motorová píla' },
    { tag: 'ChickenMeat_01', correctAnswer: 'SET_ME', lang: 'Kuracie mäso' },
    { tag: 'Chiller_01', correctAnswer: 'SET_ME', lang: 'Prenosná chladnička' },
    { tag: 'Chiller_02', correctAnswer: 'SET_ME', lang: 'Prenosná chladnička' },
    { tag: 'Chiller_03', correctAnswer: 'SET_ME', lang: 'Prenosná chladnička' },
    { tag: 'ChocolateBar_01', correctAnswer: 'SET_ME', lang: 'Čokoláda' },
    { tag: 'ChocolateBar_02', correctAnswer: 'SET_ME', lang: 'Čokoláda' },
    { tag: 'ChocolateBar_03', correctAnswer: 'SET_ME', lang: 'Čokoláda' },
    { tag: 'Cigar_01', correctAnswer: 'SET_ME', lang: 'Cigára' },
    { tag: 'Cigar_02', correctAnswer: 'SET_ME', lang: 'Cigára' },
    { tag: 'Cigar_03', correctAnswer: 'SET_ME', lang: 'Cigára' },
    { tag: 'Cigar_04', correctAnswer: 'SET_ME', lang: 'Cigára' },
    { tag: 'Ciggie_01', correctAnswer: 'SET_ME', lang: 'Cigareta' },
    { tag: 'Ciggie_02', correctAnswer: 'SET_ME', lang: 'Cigareta' },
    { tag: 'Cleaver_01', correctAnswer: 'SET_ME', lang: 'Sekáčik' },
    { tag: 'CoffeeCup_01', correctAnswer: 'SET_ME', lang: 'Hrnček' },
    { tag: 'CoffeeCup_02', correctAnswer: 'SET_ME', lang: 'Hrnček' },
    { tag: 'CoffeeCup_03', correctAnswer: 'SET_ME', lang: 'Hrnček' },
    { tag: 'Coin_01', correctAnswer: 'SET_ME', lang: 'Minca' },
    { tag: 'Coin_02', correctAnswer: 'SET_ME', lang: 'Minca' },
    { tag: 'Cookie_01', correctAnswer: 'SET_ME', lang: 'Sušienka' },
    { tag: 'Corn_01', correctAnswer: 'SET_ME', lang: 'Kukurica' },
    { tag: 'Corn_02', correctAnswer: 'SET_ME', lang: 'Kukurica' },
    { tag: 'CrowBar_01', correctAnswer: 'SET_ME', lang: 'Páčidlo' },
    { tag: 'CupCake_01', correctAnswer: 'SET_ME', lang: 'Koláčik' },
    { tag: 'CupCake_02', correctAnswer: 'SET_ME', lang: 'Koláčik' },
    { tag: 'CupCake_03', correctAnswer: 'SET_ME', lang: 'Koláčik' },
    { tag: 'Donut_01', correctAnswer: 'SET_ME', lang: 'Šiška' },
    { tag: 'Donut_02', correctAnswer: 'SET_ME', lang: 'Šiška' },
    { tag: 'Donut_03', correctAnswer: 'SET_ME', lang: 'Šiška' },
    { tag: 'Donut_04', correctAnswer: 'SET_ME', lang: 'Šiška' },
    { tag: 'Drill_01', correctAnswer: 'SET_ME', lang: 'Vŕtačka' },
    { tag: 'Drill_02', correctAnswer: 'SET_ME', lang: 'Vŕtačka' },
    { tag: 'Drill_03', correctAnswer: 'SET_ME', lang: 'Vŕtačka' },
    { tag: 'EnergyCan_01', correctAnswer: 'SET_ME', lang: '' },
    { tag: 'EnergyCan_02', correctAnswer: 'SET_ME', lang: '' },
    { tag: 'FireAxe_01', correctAnswer: 'SET_ME', lang: 'Požiarna sekera' },
    { tag: 'Flare_01', correctAnswer: 'SET_ME', lang: 'Svetlica' },
    { tag: 'Flare_02', correctAnswer: 'SET_ME', lang: 'Svetlica' },
    { tag: 'Flare_03', correctAnswer: 'SET_ME', lang: 'Svetlica' },
    { tag: 'FlashLight_01', correctAnswer: 'SET_ME', lang: 'Baterka' },
    { tag: 'FryPan_01', correctAnswer: 'SET_ME', lang: 'Panvica' },
    { tag: 'FuelCan_01', correctAnswer: 'SET_ME', lang: 'Bandaska s benzínom' },
    { tag: 'GolfClub_01', correctAnswer: 'SET_ME', lang: 'Golfová palica' },
    { tag: 'Hammer_01', correctAnswer: 'SET_ME', lang: 'Kladivo' },
    { tag: 'Handbag_01 1', correctAnswer: 'SET_ME', lang: 'Kabelka' },
    { tag: 'Handbag_01', correctAnswer: 'SET_ME', lang: 'Kabelka' },
    { tag: 'Handbag_02', correctAnswer: 'SET_ME', lang: 'Kabelka' },
    { tag: 'Handbag_03', correctAnswer: 'SET_ME', lang: 'Kabelka' },
    { tag: 'Handbag_04', correctAnswer: 'SET_ME', lang: 'Kabelka' },
    { tag: 'Handbag_05', correctAnswer: 'SET_ME', lang: 'Kabelka' },
    { tag: 'Handbag_06', correctAnswer: 'SET_ME', lang: 'Kabelka' },
    { tag: 'HealthPack_01', correctAnswer: 'SET_ME', lang: 'Lekárnička' },
    { tag: 'HotDog_01', correctAnswer: 'SET_ME', lang: 'Párok v rohlíku' },
    { tag: 'IceBlock_01', correctAnswer: 'SET_ME', lang: 'Nanuk' },
    { tag: 'IceBlock_02', correctAnswer: 'SET_ME', lang: 'Nanuk' },
    { tag: 'IceBlock_03', correctAnswer: 'SET_ME', lang: 'Nanuk' },
    {
      tag: 'IceCreamSundae_01',
      correctAnswer: 'SET_ME',
      lang: 'Zmrzlinovy pohár',
    },
    { tag: 'IceCream_01', correctAnswer: 'SET_ME', lang: 'Zmrzlina' },
    { tag: 'IceCream_02', correctAnswer: 'SET_ME', lang: 'Zmrzlina' },
    { tag: 'IceCream_03', correctAnswer: 'SET_ME', lang: 'Zmrzlina' },
    { tag: 'Jam_01', correctAnswer: 'SET_ME', lang: 'Džem' },
    { tag: 'Jam_02', correctAnswer: 'SET_ME', lang: 'Džem' },
    { tag: 'Jam_03', correctAnswer: 'SET_ME', lang: 'Džem' },
    { tag: 'Jam_04', correctAnswer: 'SET_ME', lang: 'Džem' },
    { tag: 'KiwiFruit_01', correctAnswer: 'SET_ME', lang: 'Kiwi' },
    { tag: 'Knife_01', correctAnswer: 'SET_ME', lang: 'Nôž' },
    { tag: 'Knife_02', correctAnswer: 'SET_ME', lang: 'Nôž' },
    { tag: 'Longboard_01', correctAnswer: 'SET_ME', lang: 'LongBoard' },
    { tag: 'Longboard_02', correctAnswer: 'SET_ME', lang: 'LongBoard' },
    { tag: 'Machete_01', correctAnswer: 'SET_ME', lang: 'Mačeta' },
    { tag: 'MedicBox_01', correctAnswer: 'SET_ME', lang: 'Lekárnička' },
    { tag: 'MetalPipe_03', correctAnswer: 'SET_ME', lang: 'Železná rúra' },
    { tag: 'MilkBottle_01', correctAnswer: 'SET_ME', lang: 'Fľaša s mliekom' },
    { tag: 'MilkBottle_02', correctAnswer: 'SET_ME', lang: 'Fľaša s mliekom' },
    { tag: 'MilkCarton_01', correctAnswer: 'SET_ME', lang: 'Krabica mlieka' },
    { tag: 'MilkCarton_02', correctAnswer: 'SET_ME', lang: 'Krabica mlieka' },
    { tag: 'Muffin_01', correctAnswer: 'SET_ME', lang: 'Mafin' },
    { tag: 'Muffin_02', correctAnswer: 'SET_ME', lang: 'Mafin' },
    { tag: 'Muffin_03', correctAnswer: 'SET_ME', lang: 'Mafin' },
    { tag: 'Needle_01', correctAnswer: 'SET_ME', lang: 'Injekcia' },
    { tag: 'NewsPaper_01', correctAnswer: 'SET_ME', lang: 'Noviny' },
    { tag: 'PaperBottle_01', correctAnswer: 'SET_ME', lang: 'Papierová fľaša' },
    { tag: 'PaperBottle_02', correctAnswer: 'SET_ME', lang: 'Papierová fľaša' },
    { tag: 'Pie_01', correctAnswer: 'SET_ME', lang: 'Koláč' },
    { tag: 'Pie_02', correctAnswer: 'SET_ME', lang: 'Koláč' },
    { tag: 'Pie_03', correctAnswer: 'SET_ME', lang: 'Koláč' },
    { tag: 'Pills_01', correctAnswer: 'SET_ME', lang: 'Tabletky' },
    { tag: 'Pills_02', correctAnswer: 'SET_ME', lang: 'Tabletky' },
    { tag: 'Pipe_01', correctAnswer: 'SET_ME', lang: 'Tabletky' },
    { tag: 'Pipe_02', correctAnswer: 'SET_ME', lang: 'Fajka' },
    { tag: 'Pizza_01', correctAnswer: 'SET_ME', lang: 'Pizza' },
    { tag: 'Plank_01', correctAnswer: 'SET_ME', lang: 'Drevo' },
    {
      tag: 'PlasticCoffeeCup_01',
      correctAnswer: 'SET_ME',
      lang: 'Plastový pohár',
    },
    {
      tag: 'PlasticCoffeeCup_02',
      correctAnswer: 'SET_ME',
      lang: 'Plastový pohár',
    },
    { tag: 'Plunger_01', correctAnswer: 'SET_ME', lang: 'Piest' },
    { tag: 'PopCorn_01', correctAnswer: 'SET_ME', lang: 'PopCorn' },
    {
      tag: 'RolledPaper_01',
      correctAnswer: 'SET_ME',
      lang: 'Zrolovaný papier',
    },
    { tag: 'Sandwich_01', correctAnswer: 'SET_ME', lang: 'Sendvič' },
    { tag: 'ScrewDriver_01', correctAnswer: 'SET_ME', lang: 'Skrutkovač' },
    { tag: 'ScrewDriver_02', correctAnswer: 'SET_ME', lang: 'Skrutkovač' },
    { tag: 'ScrewDriver_03', correctAnswer: 'SET_ME', lang: 'Skrutkovač' },
    { tag: 'Skateboard_01', correctAnswer: 'SET_ME', lang: 'Skateboard' },
    { tag: 'SledgeHammer_01', correctAnswer: 'SET_ME', lang: 'Kladivo' },
    { tag: 'SmartPhone_01', correctAnswer: 'SET_ME', lang: 'Smartfón' },
    { tag: 'SmartPhone_02', correctAnswer: 'SET_ME', lang: 'Smartfón' },
    { tag: 'SmartPhone_03', correctAnswer: 'SET_ME', lang: 'Smartfón' },
    { tag: 'SmartPhone_04', correctAnswer: 'SET_ME', lang: 'Smartfón' },
    { tag: 'SmartPhone_05', correctAnswer: 'SET_ME', lang: 'Smartfón' },
    { tag: 'SmartPhone_06', correctAnswer: 'SET_ME', lang: 'Smartfón' },
    { tag: 'SmartPhone_07', correctAnswer: 'SET_ME', lang: 'Smartfón' },
    { tag: 'SmartPhone_08', correctAnswer: 'SET_ME', lang: 'Smartfón' },
    { tag: 'SodaCan_01', correctAnswer: 'SET_ME', lang: 'Plechovka' },
    { tag: 'SodaCan_02', correctAnswer: 'SET_ME', lang: 'Plechovka' },
    { tag: 'SodaCan_03', correctAnswer: 'SET_ME', lang: 'Plechovka' },
    { tag: 'Spade_01', correctAnswer: 'SET_ME', lang: 'Rýľ' },
    { tag: 'Spanner_01', correctAnswer: 'SET_ME', lang: 'Kĺuč' },
    { tag: 'Spatula_01', correctAnswer: 'SET_ME', lang: 'Špachtľa' },
    { tag: 'SportsBag_01', correctAnswer: 'SET_ME', lang: 'Športová taška' },
    { tag: 'SportsBag_02', correctAnswer: 'SET_ME', lang: 'Športová taška' },
    { tag: 'SportsBag_03', correctAnswer: 'SET_ME', lang: 'Športová taška' },
    { tag: 'SteakMeat_01', correctAnswer: 'SET_ME', lang: 'Steak' },
    { tag: 'StrawCup_01', correctAnswer: 'SET_ME', lang: 'Plastový pohár' },
    { tag: 'StrawCup_02', correctAnswer: 'SET_ME', lang: 'Plastový pohár' },
    { tag: 'Sword_01', correctAnswer: 'SET_ME', lang: 'Meč' },
    { tag: 'Tablet_01 1', correctAnswer: 'SET_ME', lang: 'Tablet' },
    { tag: 'Tablet_01', correctAnswer: 'SET_ME', lang: 'Tablet' },
    { tag: 'Tablet_02', correctAnswer: 'SET_ME', lang: 'Tablet' },
    { tag: 'Tablet_03', correctAnswer: 'SET_ME', lang: 'Tablet' },
    { tag: 'Taco_01', correctAnswer: 'SET_ME', lang: 'Taco' },
    { tag: 'ToolBox_01', correctAnswer: 'SET_ME', lang: 'Box s náradím' },
    { tag: 'ToolBox_02', correctAnswer: 'SET_ME', lang: 'Box s náradím' },
    { tag: 'ToolBox_03', correctAnswer: 'SET_ME', lang: 'Box s náradím' },
    { tag: 'WalkieTalkie_01', correctAnswer: 'SET_ME', lang: 'Vysielačka' },
    { tag: 'WalkieTalkie_02', correctAnswer: 'SET_ME', lang: 'Vysielačka' },
    { tag: 'WalkieTalkie_03', correctAnswer: 'SET_ME', lang: 'Vysielačka' },
    {
      tag: 'WalkingStick_01',
      correctAnswer: 'SET_ME',
      lang: 'Palica na chodenie',
    },
    { tag: 'WaterBottle_01', correctAnswer: 'SET_ME', lang: 'Plastová fľaša' },
    { tag: 'WaterBottle_02', correctAnswer: 'SET_ME', lang: 'Plastová fľaša' },
    { tag: 'Weight_01', correctAnswer: 'SET_ME', lang: 'Závažie' },
    { tag: 'Weight_02', correctAnswer: 'SET_ME', lang: 'Závažie' },
    { tag: 'Wine_01', correctAnswer: 'SET_ME', lang: 'Víno' },
    { tag: 'Wine_02', correctAnswer: 'SET_ME', lang: 'Víno' },
    { tag: 'Wine_03', correctAnswer: 'SET_ME', lang: 'Víno' },
    { tag: 'WoodPlank_01', correctAnswer: 'SET_ME', lang: 'Drevená doska' },
    { tag: 'Wrench_01', correctAnswer: 'SET_ME', lang: 'Kľúč' },
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
