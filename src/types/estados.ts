// Archivo: utils.ts

export const mapStateToText = (state: number): string => {
    switch (state) {
      case 0:
        return 'Running';
      case 1:
        return 'Waiting';
      case 4:
        return 'Zombie';
      default:
        return 'Finished';
    }
  };
  