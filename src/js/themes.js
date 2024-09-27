const themes = {
  prairie: 'prairie',
  desert: 'desert',
  arctic: 'arctic',
  mountain: 'mountain',

  setTheme(level) {
    switch (level%4) {
      case 1: return this.prairie;
      case 2: return this.desert;
      case 3: return this.arctic;
      case 0: return this.mountain;
      default: return this.prairie
    }
  }
};

export default themes;
