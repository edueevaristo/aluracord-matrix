import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js'
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQyNTY4NCwiZXhwIjoxOTU5MDAxNjg0fQ.GdysND7uCfTxV4dLy4zyWOWjOPuItzo-6KAYm5-_dHU';
const SUPABASE_URL = 'https://oiardidrzoofjojzoxll.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function escutaMensagensEmTempoReal(adicionaMensagem) {
    return supabaseClient
        .from('mensagens')
        .on('INSERT', (respostaLive) => {
            adicionaMensagem(respostaLive.new);
        })
        .subscribe();
}

export default function ChatPage() {
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([
    ]);
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;

    React.useEffect(() => {

        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                console.log('Dados da consulta:', data);
                setListaDeMensagens(data);
            });

        escutaMensagensEmTempoReal((novaMensagem) => {
            console.log('Nova Mensagem: ' + novaMensagem);
            setListaDeMensagens((valorAtualDaLista) => {
                return [
                    novaMensagem, ...valorAtualDaLista,]
            });
        });
    }, []);

    function handleNovaMensagem(novaMensagem) {
        const mensagemEnviada = {
            de: usuarioLogado,
            texto: novaMensagem,
        };

        supabaseClient
            .from('mensagens')
            .insert([
                mensagemEnviada
            ])
            .then(({ data }) => {
                console.log('Criando Mensagem: ', data);
            });
        setMensagem('');
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://i.imgur.com/OUMp1Wi.jpg)`,
                backgroundBlend: 'multiply',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    borderRadius: '5px',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderColor: '#FFFFFF',
                    backgroundColor: 'rgba(242, 255, 10, 0.21)',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(20px)',
                    webkitBackdropFilter: 'blur(20px)',
                    height: '90%',
                    maxWidth: '75%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />

                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'column',
                        height: '90%',
                        padding: '15px',
                        backgroundColor: 'rgba(255, 255, 255, 0)',
                        borderRadius: '5px',
                    }}
                >

                    <MessageList mensagens={listaDeMensagens} />
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Digite sua mensagem..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '1',
                                borderColor: appConfig.theme.colors.neutrals['000'],
                                borderRadius: '5px',
                                resize: 'none',
                                padding: '6px 5px',
                                backgroundColor: appConfig.theme.colors.primary[122],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals["000"],
                            }}
                        />
                        <ButtonSendSticker
                            onStickerClick={(sticker) => {
                                console.log('Salva esse sticker no banco');
                                handleNovaMensagem(':sticker: ' + sticker);
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{
                width: '100%',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
            >

                <Text
                    variant='heading5'

                    styleSheet={{
                        color: appConfig.theme.colors.neutrals[500]
                    }}
                >
                    Chat de Mensagens
                </Text>

                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Sair'
                    href="/"

                    styleSheet={{
                        padding: '10px',
                        color: appConfig.theme.colors.neutrals[999],
                        backgroundColor: appConfig.theme.colors.neutrals["000"],
                        hover: {
                            backgroundColor: appConfig.theme.colors.primary[122],
                        }
                    }}
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    console.log(props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflowY: 'scroll',
                wordBreak: 'break-word',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals[500],
                marginBottom: '18px',
            }}
        >

            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"

                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginHorizontal: '8px',
                            marginBottom: '12px',
                            hover: {
                                background: 'rgba(241, 255, 0, 1)',
                            }
                        }}
                    >

                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >

                            <Image
                                styleSheet={{
                                    width: '25px',
                                    height: '25px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                    marginBottom: '-5px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />

                            <Text tag="strong">
                                {mensagem.de}
                            </Text>

                            <Text
                                styleSheet={{
                                    fontSize: '12px',
                                    marginLeft: '1000px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>

                        {mensagem.texto.startsWith(':sticker:') ?
                            (

                                <Image src={mensagem.texto.replace(':sticker:', '')}
                                    styleSheet={{
                                        width: '130px',
                                    }}
                                />
                            ) : (
                                mensagem.texto
                            )}
                    </Text>
                );
            })}
        </Box>
    )
}
