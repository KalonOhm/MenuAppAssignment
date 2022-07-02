class Unit {
    constructor(unitName, unitModels, unitRole, psyker) {
        this.unitName = unitName;
        this.unitModels = unitModels;
        this.unitRole = unitRole;
    }

    describe() {
    return `${this.unitName} has ${this.unitModels} model(s), and fills a ${this.unitRole} slot in the army.`
    }
}

class Faction {
    constructor (factionName){
        this.factionName = factionName;
        this.units = [];
    }

    addUnit(unit) {
        if (unit instanceof Unit) {
            this.units.push(unit)
        } else {
            throw new Error(`You can only add an instance of Unit. Argument is not a unit: ${unit}`);
        }
    }

    describe() {
        return `${this.name} has ${this.units.length} units.`;
    }
}

class Menu {
    constructor(){
        this.factions = [];
        this.selectedFaction = null;
    }
    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createFaction();
                    break;
                case '2':
                    this.viewFaction();
                    break;
                case '3':
                    this.deleteFaction();
                    break;
                case '4':
                    this.displayFactions();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Exiting selection');
    }

    showMainMenuOptions() {
        return prompt(`
            0) exit
            1) create new faction
            2) view faction
            3) delete faction
            4) display all factions
        `);
    }

    showFactionMenuOptions(factionInfo) {
        return prompt(`
        0) back
        1) create unit
        2) delete unit
        -------------------
        ${factionInfo}`);
    }

    displayFactions() {
        let factionString = '';
        for (let i=0; i < this.factions.length; i++) {
            factionString += i + ') '   + this.factions[i].factionName + '\n';
        }
        alert(factionString);
    }

    createFaction() {
        let factionName = prompt('Enter name for new faction:');
        this.factions.push(new Faction(factionName));
    }

    viewFaction() {
        let index = prompt("Enter the index of the faction you wish to view.");
        if (index > -1 && index < this.factions.length) {
            this.selectedFaction = this.factions[index];
            let description = "Faction Name: " + this.selectedFaction.factionName + '\n';

            for (let i = 0; i < this.selectedFaction.units.length; i++) {
                description += i + ') ' + this.selectedFaction.units[i].unitName + ' - ' 
                + this.selectedFaction.units[i].unitModels + ' - ' 
                + this.selectedFaction.units[i].unitRole + '\n';

            }
            let selection = this.showFactionMenuOptions(description);
            switch (selection) {
                case '1':                    
                    this.createUnit();
                    break;
                case '2':
                    this.deleteUnit();
            }
        }
    }

    deleteFaction() {
        let index = prompt('Enter the index of the faction to remove:');
        if (index > -1 && index < this.factions.length) {
            this.factions.splice(index, 1);
        }
    }

    createUnit() {
        let unitName = prompt('Enter name for unit:');
        let unitModels = prompt('Enter how many individuals in unit:');
        let unitRole = prompt('Enter battlefield role:');
        this.selectedFaction.units.push(new Unit(unitName, unitModels, unitRole));
    }

    deleteUnit() {
        let index = prompt('Enter the index of the unit to delete:');
        if (index > -1 && index < this.selectedFaction.units.length) {
            this.selectedFaction.units.splice(index, 1);
        }
    }

}


let menu = new Menu();
menu.start();