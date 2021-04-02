import React, { useState } from 'react';

const ContactMe = () => {

    const [gdprChecked, setGdprChecked] = useState(false)
    const handleClick = () => setGdprChecked(!gdprChecked)

    return <>
        <form method="post" action="https://formsubmit.co/8a190bb170b130de0b8d01c967646eca">
            <input type="hidden" name="_next" value="https://www.nutrizionistaemanuelacasula.it/ThankYou"></input>
            <div className="row gtr-uniform">
                <div className="col-6 col-12-xsmall">
                    <input type="text" name="name" id="name" defaultValue="" placeholder="Nome" />
                </div>
                <div className="col-6 col-12-xsmall">
                    <input type="email" name="email" id="email" defaultValue="" placeholder="Email" required />
                </div>
                <div className="col-12">
                    <textarea name="message" id="message" placeholder="Scrivi il tuo messaggio" rows="6"></textarea>
                </div>
                <div className="col-12-small">
                    <input type="checkbox" id="gdpr-consent" name="gdpr-consent" onClick={handleClick} checked={gdprChecked} />
                    <label htmlFor="gdpr-consent">Dichiaro di aver letto e compreso l'informativa sulla privacy e acconsento al trattamento dei dati personali ai sensi dell'articolo 13 del Regolamento (UE) 2016/679.</label>
                </div>
                <div className="col-12">
                    <a href="/Privacy" target="_blank">Leggi l'informativa</a>
                </div>
                <div className="col-12">
                    <ul className="actions">
                        <li><input type="submit" value="Invia Messaggio" className={`primary ${!gdprChecked ? "disabled" : "enabled"}`} /></li>
                    </ul>
                </div>
            </div>
        </form>
    </>
}

export default ContactMe;