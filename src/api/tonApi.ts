export const getAccountInfo = async (account: Account) =>  {
    const response = await (
        await fetch(`${this.host}/dapp/getAccountInfo?network=${account.chain}`, {
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
                'Content-Type': 'application/json',
            },
        })
    ).json();

    return response as {};
}
