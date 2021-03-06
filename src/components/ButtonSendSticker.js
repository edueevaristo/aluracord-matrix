import React from 'react';
import { Box, Button, Text, Image } from '@skynexui/components';
import appConfig from '../../config.json';

export function ButtonSendSticker(props) {
    const [isOpen, setOpenState] = React.useState('');

    return (
        <Box
            styleSheet={{
                position: 'relative',
            }}
        >
            <Button
                styleSheet={{
                    borderRadius: '10%',
                    padding: '0 3px 0 0',
                    minWidth: '42px',
                    minHeight: '42px',
                    fontSize: '20px',
                    marginBottom: '7px',
                    marginLeft: '5px',
                    lineHeight: '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary[122],
                    /* hover: {
                        backgroundColor: appConfig.theme.colors.background.fundoBlue,
                        border: '1px solid #000000',
                      },
                      focus: {
                        backgroundColor: appConfig.theme.colors.background.fundoBlue,
                      }  */
                }}
                label="🐝"
                onClick={() => setOpenState(!isOpen)}
            />
            {isOpen && (
                <Box
                    styleSheet={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '5px',
                        position: 'absolute',
                        backgroundColor: appConfig.theme.colors.neutrals["000"],
                        height: '300px',
                        right: '15px',
                        bottom: '69px',
                        padding: '16px',
                        boxShadow: 'rgba(4, 4, 5, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px 8px 16px 0px',
                        width: {
                            xs: '200px',
                            sm: '290px',
                        },
                    }}
                    onClick={() => setOpenState(false)}
                >
                    <Text
                        styleSheet={{
                            color: appConfig.theme.colors.neutrals[999],
                            fontWeight: 'bold',
                        }}
                    >
                        Stickers
                    </Text>
                    <Box
                        tag="ul"
                        styleSheet={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            flex: 1,
                            paddingTop: '10px',
                            overflowY: 'scroll',
                        }}
                    >
                        {appConfig.stickers.map((sticker) => (
                            <Text
                                onClick={() => {
                                    if (Boolean(props.onStickerClick)) {
                                        props.onStickerClick(sticker);
                                    }
                                }}
                                tag="li" key={sticker}
                                styleSheet={{
                                    width: '30%',
                                    borderRadius: '3px',
                                    padding: '10px',
                                    focus: {
                                        backgroundColor: appConfig.theme.colors.neutrals[600],
                                    },
                                    hover: {
                                        backgroundColor: appConfig.theme.colors.primary[122],
                                    }
                                }}
                            >
                                <Image src={sticker} />
                            </Text>
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    )
}