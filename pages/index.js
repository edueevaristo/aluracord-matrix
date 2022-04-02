import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router'; // chamada de página com o Router no Next
import appConfig from '../config.json';


function Titulo(props) {
    const Tag = props.tag
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.neutrals['000']};
                font-size: 22px;
                font-weight: 600;
            }
            `}</style>
        </>
    );
}

export default function PaginaInicial() {

    const [username, setUsername] = React.useState('');
    const roteamento = useRouter();
    const picUsuarioNull = 'https://i.imgur.com/P3R3KYn.png' // Deixando o campo de usuário em branco e com imagem de entrada

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary[500],
                    backgroundImage: 'url(https://i.imgur.com/bgHaTg2.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                        backgroundColor: appConfig.theme.colors.neutrals[999],
                        background: 'rgba(255, 255, 255, 0)',
                        backdropFilter: 'blur(8.6px)',
                        border: '2px solid rgba(255, 255, 255, 1)'
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={function (infosDoEvento) {
                            infosDoEvento.preventDefault();
                            console.log('Alguém enviou o form');
                            roteamento.push(`/chat?username=${username}`); // atribuindo a chamada para outra página com o push e o useRouter da string 3
                            // window.location.href = '/chat';  Jeito tradicional de chamar outra página
                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Titulo tag="h2">Bem-vindos, polinizadores!</Titulo>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals["000"] }}>
                            {appConfig.name}
                        </Text>

                        {<TextField
                            autocomplete="off"
                            placeholder='Insira seu usuário do Github'
                            value={username}
                            onChange={function (event) {
                                const valueUser = event.target.value;
                                setUsername(valueUser);
                            }}

                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[999],
                                    mainColor: appConfig.theme.colors.neutrals["000"],
                                    mainColorHighlight: appConfig.theme.colors.primary["000"],
                                    backgroundColor: appConfig.theme.colors.neutrals["000"],
                                },
                            }}
                        />}
                        <Button
                            type='submit'
                            label='Clique para entrar na Colméia'
                            disabled={username.length < 3} // só é permitido com 3 caracteres ou mais
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.primary[121],
                                mainColor: appConfig.theme.colors.neutrals["000"],
                                mainColorLight: appConfig.theme.colors.neutrals["000"],
                                mainColorStrong: appConfig.theme.colors.primary[122],
                                borderColor: appConfig.theme.colors.neutrals["000"],
                            }}
                        />


                    </Box>


                    {/* Formulário */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.primary[122],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals["000"],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}
                            src={username.length > 2 ? `https://github.com/${username}.png` : picUsuarioNull}
                            onError={function (error) {
                                error.target.src = `${picUsuarioNull}`
                            }}
                        />
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.primary[233],
                                backgroundColor: appConfig.theme.colors.neutrals["000"],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {username}
                        </Text>
                    </Box>

                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}
