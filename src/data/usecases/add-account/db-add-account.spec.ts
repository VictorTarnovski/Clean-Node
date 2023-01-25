import { Encrypter } from './db-add-account-protocols'
import { DbAddAccount } from '../add-account/db-add-account'

interface SutTypes {
    sut: DbAddAccount,
    encrypterStub: Encrypter
}

const makeSut = (): SutTypes => {
    class EncrypterStub {
        async encrypt(value: string): Promise<string> {
            return new Promise(resolve => resolve('hashed_password'))
        }
    }
    const encrypterStub = new EncrypterStub()
    const sut = new DbAddAccount(encrypterStub)
    return {
        sut,
        encrypterStub
    }
}

describe('DbAddAccount Usecase', () => {
    test('Should AddAccount calls Encrypter with correct password', () => {
        const { sut, encrypterStub } = makeSut()
        const encryptSpy = jest.spyOn(encrypterStub,'encrypt')
        const accountData = {
            name: 'valid_name',
            email: 'valid_email',
            password: 'valid_password'
        }
        sut.add(accountData)
        expect(encryptSpy).toHaveBeenCalledWith('valid_password')
    })

    test('Should thorw if Encrypter throws', () => {
        const { sut, encrypterStub } = makeSut()
        const encryptSpy = jest.spyOn(encrypterStub,'encrypt').mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error)))
        const accountData = {
            name: 'valid_name',
            email: 'valid_email',
            password: 'valid_password'
        }
        const promise = sut.add(accountData)
        expect(promise).rejects.toThrow()
    })
})