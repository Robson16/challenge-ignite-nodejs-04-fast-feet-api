export class CPF {
  public readonly value: string

  constructor(value: string) {
    this.value = value
  }

  static create(cpf: string): CPF {
    return new CPF(cpf)
  }

  static createFromText(cpf: string): CPF {
    if (CPF.validate(cpf)) {
      return new CPF(cpf)
    } else {
      throw new Error('Invalid CPF')
    }
  }

  /**
   * Receives a CPF in string and validates
   *
   * @param cpf
   */
  static validate(cpf: string): boolean {
    // Remove non-numeric characters
    const cleanedCPF = cpf.replace(/\D/g, '')

    // Check if the CPF has 11 digits
    if (cleanedCPF.length !== 11) {
      return false
    }

    // Check if all digits are equal
    if (/^(\d)\1{10}$/.test(cleanedCPF)) {
      return false
    }

    // Calculate the first check digit
    let sum = 0
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleanedCPF[i - 1]) * (11 - i)
    }
    let remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) {
      remainder = 0
    }
    if (remainder !== parseInt(cleanedCPF[9])) {
      return false
    }

    // Calculate the second check digit
    sum = 0
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleanedCPF[i - 1]) * (12 - i)
    }
    remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) {
      remainder = 0
    }
    if (remainder !== parseInt(cleanedCPF[10])) {
      return false
    }

    return true
  }
}
