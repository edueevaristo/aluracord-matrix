import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { BiSend } from 'react-icons/bi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQyNTY4NCwiZXhwIjoxOTU5MDAxNjg0fQ.GdysND7uCfTxV4dLy4zyWOWjOPuItzo-6KAYm5-_dHU';
const SUPABASE_URL = 'https://oiardidrzoofjojzoxll.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatPage() {
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;

    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                console.log('Dados da consulta', data);
                setListaDeMensagens(data);
            });

        escutaMensagensEmTempoReal((novaMensagem) => {
            console.log('Nova Mensagem', novaMensagem);
            if (usuarioLogado != novaMensagem.de) {
            }
            setListaDeMensagens((valorAtualDaLista) => {
                return [
                    novaMensagem, ...valorAtualDaLista,]
            });
        });
    }, []);

    function escutaMensagensEmTempoReal(adicionaMensagem) {
        return supabaseClient
            .from('mensagens')
            .on('INSERT', (respostaLive) => {
                adicionaMensagem(respostaLive.new);
            })
            .subscribe();
    }

    function handleNovaMensagem(novaMensagem) {
        const mensagemEnviada = {
            // id: listaDeMensagens.length + 1,
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

                    <Text variant='heading4'
                        styleSheet={{
                            color: appConfig.theme.colors.primary[122],

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
                            padding: '14px',
                            width: '70px',
                            height: '40px',
                            color: appConfig.theme.colors.neutrals[999],
                            backgroundColor: appConfig.theme.colors.primary[122],
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[878],
                            }
                        }}
                    />
                </Box>
            </>
        )
    }


    return (
        //Background Imagem
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '100%',
                maxWidth: '100%',
                minWidth: '200px',
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
                    backgroundImage: `url(https://img.freepik.com/vetores-gratis/fundo-branco-abstrato_23-2148808256.jpg?t=st=1648876559~exp=1648877159~hmac=4bae70cd771c2269f55ad7cb2e31283ff9fd2ca71d106ad5337d854a9765b484&w=1380)`,
                    boxShadow: '0 9px 38px rgba(0, 0, 0, 0.1)',
                    backgroundBlend: 'multiply',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    height: '90%',
                    maxWidth: '80%',
                    minWidth: '5%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                {/* Cabeçalho */}
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
                        //Array de Mensagens
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center'
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
                                    console.log(event);
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
                                color: appConfig.theme.colors.neutrals[400],
                                hover: {
                                    transition: 'delay 2s'
                                }
                            }}

                        />

                        <ButtonSendSticker
                            onStickerClick={(sticker) => {
                                console.log('Salva esse sticker no banco', sticker);
                                handleNovaMensagem(':sticker: ' + sticker)
                            }}
                        />

                        <Button
                            variant='tertiary'
                            label={< BiSend size={25} />}
                            title={`Enviar Mensagem`}
                            type='submit'
                            styleSheet={{
                                position: 'absolute',
                                marginBottom: '6px',
                                right: '73px',
                                color: appConfig.theme.colors.neutrals[999],
                                hover: {
                                    color: appConfig.theme.colors.neutrals[878],
                                }
                            }}
                            buttonColors={{
                                mainColorLight: 'none',
                            }}

                            onClick={(event) => {
                                event.preventDefault();
                                if (mensagem.length > 0) {
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )

    //Foto, nome e data das Mensagens
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
                        //////////////////////////////
                        /////Bloco de mensagens///////
                        //////////////////////////////
                        <Text
                            key={mensagem.id}
                            tag="li"

                            styleSheet={{
                                borderRadius: '5px',
                                padding: '6px',
                                marginHorizontal: '8px',
                                marginBottom: '12px',
                                hover: {
                                    background: '#D3D3D3',
                                }
                            }}
                        >
                            <Box
                                styleSheet={{
                                    marginBottom: '3px',
                                    width: '100%',
                                    marginBottom: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Box>
                                    <Image

                                        //////////////////////////
                                        ////Foto do usuário///////
                                        //////////////////////////
                                        styleSheet={{
                                            width: '3%',
                                            maxWidth: '2%',
                                            minWidth: '30px',
                                            height: '28px',
                                            borderRadius: '50%',
                                            display: 'inline-block',
                                            marginRight: '8px',
                                            marginBottom: '-5px',
                                        }}
                                        src={`https://github.com/${mensagem.de}.png`}
                                    />

                                    <Text tag="strong"
                                    >{mensagem.de}
                                    </Text>

                                    <Text
                                        ///////////////////////////
                                        /////Data da mensagem//////
                                        ///////////////////////////
                                        styleSheet={{
                                            fontSize: '10px',
                                            marginLeft: '8px',
                                            color: appConfig.theme.colors.neutrals[300],
                                        }}
                                        tag="span"
                                    >
                                        {(new Date().toLocaleDateString())}
                                    </Text>
                                </Box>

                                {usuarioLogado === mensagem.de ?
                                    <Box
                                        title={`Apagar mensagem?`}
                                        styleSheet={{
                                            padding: '2px 15px',
                                            cursor: 'pointer',
                                            hover: {
                                                color: appConfig.theme.colors.neutrals[878]
                                            }
                                        }}
                                        onClick={() => {

                                            const resposta = confirm('Deseja remover essa mensagem?')
                                            if (resposta === true) {
                                                supabaseClient
                                                    .from('mensagens')
                                                    .delete()
                                                    .match({ id: mensagem.id }).then(() => {
                                                        let indice = listaDeMensagens.indexOf(mensagem);
                                                        listaDeMensagens.splice(indice, 1)
                                                        setListaDeMensagens([...listaDeMensagens])
                                                    })
                                            }
                                        }}
                                    >
                                        {<RiDeleteBinLine />}
                                    </Box>
                                    : null}
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
}
