export class FormatData {
  // eslint-disable-next-line
  brewCasksInfo: any[];
  // eslint-disable-next-line
  brewLsFormulas: any[]
  
  constructor ( brewLs: string , brewOutdatedStr: string){
    const json = JSON.parse( brewLs )

    this.brewCasksInfo = json.casks
    this.brewLsFormulas = json.formulae
    const brewOutdated = JSON.parse(brewOutdatedStr)

    // eslint-disable-next-line 
    brewOutdated.formulae.forEach( (r: any ) => {
      this.brewLsFormulas.filter( f => {return f.name ===r.name }).forEach( row =>{
        row.outdated = true;
        row.outdatedData = r
        row.outdatedNewVer = r.current_version
      } )
    });


    // eslint-disable-next-line 
    brewOutdated.casks.forEach( (r: any ) => {
      this.brewCasksInfo.filter( f => {return f.token ===r.name }).forEach( row =>{
        row.outdated = true;
        row.outdatedData = r
        row.outdatedNewVer = r.current_version
        row.version = r.installed_versions
      } )
    });


    this.brewCasksInfo.forEach(row => {
      row.ver = row.version
      if (row.auto_updates)  {row.ver = 'auto update'}  
    });

    this.brewLsFormulas.forEach(row => {
      row.ver = row.installed[0].version
      if (row.pinned) {
        row.ver = "📌 " + row.ver
      }
    });




  }
}