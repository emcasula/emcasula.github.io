import React, { useState } from 'react';

const ContactMe = () => {
    const whatsappNumber = '393XXXXXXXXX'; // inserisci il numero in formato internazionale, senza +
    const whatsappMessage = encodeURIComponent(
        'Ciao, ti contatto dal sito per avere informazioni sui percorsi nutrizionali.'
    );

    return (
        <>
            <div className="row gtr-uniform">
                <div className="col-12">
                    <p>
                        Se vuoi risultati concreti e un approccio davvero personalizzato, chiedi informazioni o prenota tramite MioDottore o WhatsApp.
                    </p>
                </div>

                <div className="col-12 col-6-medium">
                    <ul className="actions stacked">
                        <li>
                            <a
                                id="zl-url"
                                className="zl-url button primary fit"
                                href="https://www.miodottore.it/emanuela-casula/nutrizionista-dietista/cagliari"
                                rel="nofollow"
                                data-zlw-doctor="emanuela-casula"
                                data-zlw-type="big_with_calendar"
                                data-zlw-opinion="false"
                                data-zlw-hide-branding="true"
                                data-zlw-saas-only="false"
                                data-zlw-a11y-title="Prenota una visita"
                            >
                                MioDottore
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="col-12 col-6-medium">
                    <ul className="actions stacked">
                        <li>
                            <a
                                href={`https://wa.me/393515159912?text=${"Salve, vorrei informazioni sul percorso nutrizionale"}`}
                                target="_blank"
                                rel="noreferrer"
                                className="button fit"
                            >
                                WhatsApp
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="col-12">
                    <p style={{ marginBottom: '0.5rem' }}>
                        Utilizzando i canali di contatto esterni, i tuoi dati saranno
                        trattati secondo la{' '}
                        <a href="/Privacy" target="_blank" rel="noreferrer">
                            Privacy Policy
                        </a>
                        .
                    </p>
                </div>
            </div>
        </>
    );
};

export default ContactMe;