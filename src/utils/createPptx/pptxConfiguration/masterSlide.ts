import PptxGenJS from 'pptxgenjs'
import {
  remainingWidth,
  toPercentage,
  startXPos,
  X_PADDING,
  startYPos,
} from './utils'

const LOGO_WIDTH = 15
const LOGO_MARGIN = 2

// TODO Obviously change this to static local file
const IMAGE_PATH =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEWwJjT///+vIjGrAB2uHS2qABarAButFiiqABStEyatECSuHCyqABWsDCKrABmpABDXo6fguLv16Onmx8mnAADdsbTy4uPpztCpAAzPj5PBZm3u2Nr58PG7UlvZqKvUm5/GdHq0NkHKgYa6TVbjwMK3Q03AY2rJfYPQkZW9WmLVnKD79vfEcHayLTrBZWy3RU9o4VgrAAAatUlEQVR4nO1dZ5uqPBPGUEIRsNEEURArevz//+4FJgkJlnV3XXaf63U+nD0qJXcymZZJRpLe9KY3velNb3rTm970pje96U1vetOb3vSmN73p75BiYdOWHVV3XV2v/1Ed2TaxhX67YS8ghE1NNxarvVfEflIOGirLiR8UaXTayEPZ/A/jVAzNveReTHDdpCRIV5krY+W3G/tpQljWD6P4ATaOymC/Dm38HxpLZAzPUfAcOoay2GHnPwISD7Oj/zl4hOLI0qzfbv5HpMh29CRv3qRg5Zp/eSCxuyg+wvBI7jSUZs5flTvY3d3hTn+a7leHDNlOpQtd1zGlzWG39ILJnYE8uH+RWY1hlNwYsWB0ynRHrtS7glr2Q0ixDFNWnc3Ou8XU/in8axixur9iv3IabULZeKjRkWVq4WJ5LXgnK/cv8aoS5l18k/RQKfLnhEZlGmjzcfcJ/lb/KzIHDQ+dCZWkG9f83BBYtnsYd+djJv9Qkz9H5nkqNqw4hLclfjX7gNDNnxXbXXUmZfoH9KMS7sXJt7Tk7ughy7A1VbfPl8N2Pv+3XWwkzVVl+9q5sNTMEx93+m1WtTeCgpjsdENoUSNJNqtjEXcYuZwE4/3pHModbka2vRRm5BTjXhGJhMKlgO8UCq1RTF26rQ1aoEE6NxwRpaFGAsaT2i8qjrDEtz5ZCTrMkrW5d0eld8hPF67Ng8SO0HNj9ZcUhzPnm7F3ufFTbGfXkT+PqRxvBfFkGvx8TDZG//AqDk25NhSYawN2Dx+apzdAppthywRI3vAMsuufUxWTa0BycFj/V6Ji/xxzXlO8ctuOQuGO+8kLe5apOOOM0LQ1sJAseVcNp4M0iYNpRUHgT+55GOVeM9uXWBynx1dK6EfJPLSvThbM8kD2uWuXNFcEab49u7qjyUCa6jrZPLodwjnabByRyw1jcu5R+8ur9sVF682Z+Hr8fG91divXQukyGVKwqbmbfHztkezb+WicOX176U0zOlH71tyl3yruvtvU6U5RH0cLEbbd7CoqUCkeehMKuV479CRSh62yKjd01iB12xmM6Up/zrlAWDPzDsg4s+nPzqn9etsLRP3YtsOgHIoNUT9M9ob8mWmD1XMqTsojE1/Gpv3lXw/iRm1HsGC8pArKfxBs3evRqyYeNsyajNrhv/rZ1HeClpls6DAqmE7GuIeZqLWTbRTSFjiCBJ1uOlZWE9o3N/920TH1PG+0jHaHTLsO6OPwn2DH72kPIheCAHEPjobdiu+Imhnmhp+Bwcbhm4GwXAlML76WmBDQF0PdSjjnxzHAlNPDug/j4c8DNFpu3GnkO5U3PSYHnRs/xXQ3+4fB76TIkco7XJYQECnXVJJVIrUPgNaFvXtF1TwvzQdR2OJDhrtOb4TfrshfZio3v7DGPzGnnDLc2z8PECHWvSsiBZDGDVGAWotLkZXl8+ZpnDucZyGvuTtTOtv7UPcukwM5GUHF4tqyc1kjFX39We/CO8vt7e6o/WHq9mZzu6zRewe+sc7tnPElpo0V/fCVtYsi0xgWedE+OdZ6gmjmrLuJpWZlbfPS1s5y1jfx+cE4XUZ5nkfLtLgd0C/OzJKxzJb9/X6MNWVDXxiQmWFt2ratHNYR0jV/BqPTWa+X7g1ck2Hamqpudul1T6QOnW4obG2nwrzRoJeTSsXihEg3pR3BkkUZusHFagCOi9uhfWSZznDudaQtFz5kBmmsXd38EwCZ2XKGFigSmykTheqITnBxMFmeh8YjU7LSmJeOQTq16DCaawDYgx6sOJKp+n/wfmSyzmeSoBNcHBRr1/i4cch056JVMKcsj7OyL4CSTft5RDim1RwxleYWFuZVeh38vkeWuhEmr8ceiUq/n6A3M619ImVazUHlTsVTPLelxqdWq5GW8Rh9RAxSJbv2Qn6CFBaWIZNQZvIkpj6+w5unhfRpEws5F54F1kR29aQKXTrncnivxRD7KmkCb4UkC+crDVOE8OGpz5U1k44Y4UikMCyUFUPOQ0y/vHqLMRc+zJ2Pb3gRIYu+lPBMyNgpI1jCtmXl4hudL4QPl72F8mU6PnswLWw2CQ9Ec3EAg0+FZ67JaEPNvv3x5S8hlJE3TkCoIGasRWS0wlYMjr4dfFdUohzj3pYqHDpAB2DJkGrCKdETertEs3rF3IEln54UvcQNWaA3n00aDi7JCMptfPjwGgtZjzg74ueJDWHWvBIhCmcBEw5vGcD1q9xwLWda6OeJzcIxDJlD51wK5hs6vx5g1W19CZmKbCpIwZpRFuRjQmwZnbmyi9/MKPg6ISwOIRMzROy0seD5Z+ag8neSuw3qaMMsZE5UAaIcM6cq+oSex8ZpJfXitj9BLvEXpjDrXMqTkNWETOpOjN2Hj2lIqdcsKla2Gt99+TcgWjSQsFCEjyOQBEzs+PcAYll1XdWuxa5ySiuKsCTzXPHbROO9BAFze0Gxt07VndYaZhQkZTkpdrolmY0i9zUqfbdP2+eGWtHPSFfmROSNnGSI9mATh5Rnd7dtZG5RuJzLgDDWJAcsz6ebbIySySQpfgQipuYKzEKHjGjpiL8yN18kV8gZ2rsUIcoq38RftPkb1I3n3XnUfjCbdYxAvvHTt0klXDlu+o8pd+LWOFTM3HbEtU6W4ZAilORZRZUw1pyKlOF5kblYUhxrfXHIQFkqWlxUM6xJIQjdRsMg0z2v16bzGuWLJEHOmNTCBilo0MDa/qZUpLZBMvbqfvKxTRGajQ6NZa35vVmFKXchBMq9ZqS0U9O1oKkW0FXx9lTNdsvymn71d/orEGIyj4j9QjWHBx1NRCKzbjokA496M9sMT4PYQWweUq5z+CGmAx5XLXdG/C8LxgwrizOCg1e4MRrx5dNmkBSq3TcNUxpUjJxuu7xu8+Nk1lx7sCkL3EPIaGdZK+ELDqGx5r4vXgDRpu9omNQmyi8eAgLii/u3xQyx2I8wZesHPIkwkHUx0M8hnDXMm+xHXLO+Q7QvS8CgkveA5mAdPb89hGjNXdzQHYTJlqxp5YdmFiQuLDSPZ7OCRzjxxgv4ZTaTG4jet60ik/QdSFJmz8BzHcLBkzvWDHGcieZE9xFGMoxMEGqN6EpmgNhARBsThMHMBOc7mRJ58P0FmyFR6LtmlKgbNW2kHdMcu3tiG4Y8bsZfOd+fh3NLDmBEQL9ShNUE1gWEMpN8DWPF3uq7mXzMoAFPJyx5SNTnKIf3bicGXx5irG0GXkgR6qiDUOkiBP7fYHwREKoKhlBjEoxWaKaZ305VpGwJ64UsXANsR52M9O5coLcHUV6P/jQEhOXmIj9G6AJ7+AeyT2UB15fnrQIRFM+dofHoBfqQKniY0JRDYkfAu7lvQOnikpnPko1mjxHqjrg0vGDL6yeXW71Z3uWep0kmLwK2JAqciH9qz/gPehLZwlp9YVPl8xFCtOHvq5SCQR8hm5wiGX3bcKMTDzwjatCAEqLdfHwUeEcy3+UuCxA8RljqEqY+TAlvZJEEA7ULG+Xz3te99hFpWTbqgIXcQDnQ4XjApE1HXCADeJKea1bH2XhSlrG9jytKTbP+Ex8qy7r+u8fWqv47rcSupaR+WQaLcf3FBVU3etVnf3yWkLqu/5sEkfZtfU+NNNA61k74RKTIHZOUe4itm+ezrJIlKmQ6rq5Vjn9F1eg3Od9VQ836bx3eqP/a7EJZsesv6lsVdRbqDhiPpqPrqvwC34KKFtD3VOyA7KSfxs94pbc3qn2KLGOXL16+2EY1fASChghGEDvUJM/7CZFCbGHqSIZdEceduP785TZQTPPmicOEn3iuIISad8n1gR7aE6kXXyAHhPJJS8cVnRhEHNWfo69CVCc8Jo2IlmYaikKofpUcBUltSR2lF0ZTDL2i2kZ0CTfNmm7eM0Tg7Uy/+kry2EGj8agoTRo1KwohMYd29ETg9DkyRoOyEqgVRBtUxBkMqZchxPw4KcS3jhuzmwoh4uyr/BavQQB2HLpKVkckc6r6RfheUZTriyTOUq/AFvXGZ6wShPSiDkLhQR8TNSz8RoThXBCsxK2C3jSigUCV/kKmm83nGxdSThTLshTL3cwXqiEpw/N8ixsVYNZywtDX1ffEurX0bL5txIlt06hHiJFk1aErjUycaHaZL5z60TxCRXYW8wN2njfHaSAJRo1aaaPGhqEWXOO+UBek9I71C8vMkiwE4aLB+Iwpu8N+k/3s0DiD06rZenNNRLihhuysGgjQf3MNIsir/GI2by9VQAhGxLgSahxCeQGC0X9+wymda+AOUgUYCcpiXXMF8aMC1zacrKyT+DC37etksgndELXjKodFCFYklYsmBqAIwopyLYJbVN7QTRBqEaptpuYzKyjAMER6AF9S5QjqkL6pcd0J3CZ7z8oq9S4azgtFQMgowmI4JlCtk3DBRwgHscsQChPl2SUfOvPAd6JRKIir6UQdNqIUdCNZm6phqgC5hIsm+m2EMQs4kWYvyBpBmXyIkFyxVQlCssgZ7OCOJ9cmacgezDQ688Cep2122w8eE9lEsRQzcCEG6xm0akGGaHdp2pnogHBiz4CpU1Cy49ks5RFOjunBFBAmiNwxnhGE0FZ/FmbNZHzS0qIagcgWYuDAyi+NunEIYbrWY0iCcBW7wmURIIxsyKQKQkg4KgnC3CCucgAK6UzvIwjjmaFgAeHelPQp/EQQwhzy6cLYkzE4LEpPASExcEBVOvDgJvtFySxE2NulDuYeEK4s4IOxDRdQhJU8hikQnMT7KEKN8hNFWMkCgNQi5PzQSbFcPMmlD8aQmnANQgMk4HRmVlou8U0SeF+YBkic3WOEqWvNmoYXoJ4OJs6EMXStDkLPVUj8kSBUZeDreBytZzP7Wdv4EcIhj5Au3ySjqO7ZRCKB3tUKBIISPkQ4WP6DOb6HpyYnsrdrLpPI9ulsiJJmTw5BOUJCZHJZQKcuTfUQ757OJ7gtaeaCpCFJUp3s/Eww4sa2+xghJaSJuxjmJo2q39EWg7NJZlIy4/LnV8+aqbe1BQRhadvIs1xh92FsDLn3TWzpOYSRwdbyCEKLrk/Gs5sIlyZjHzfjvt89abjRdYlCsERBEBN/jbmHOqdwPV1CbZLNtGoFQxg8QHhU651x9FzFBqHCspOshksSFbZ8kItGlZuDSSN15cwikPH5yXmo/IMbYHHZJAYV2No0znhgO3XxsvlqksKpQNomjZMk9ta12W7XpwxMDwo+1n8jrMzrv4VNtMXIT/wxbIhVtH2cTKbrUX0sQSURLWVUPyY9n+o7xqbp1T9kaX3HBezlzPOTSWFKSD941bX++PmjlxSyVAc+IJU7qcCz7ZoFMjTdwA7bYodMTVU1ciiLTWIPNOagNF8QXo9UR2135mFZVW2l8S4QPLZ+DGruMIk3gszqDhrLgA9Ng5tX2s87UNTnhZh+h2eJLHkYLf2QCMLfy4aji9iweER9KRjRnMf7Vfoswu+FnW41gMxoiF8SqVU2CoLm1fjPBPgUeyhjU9eu2kb8w2fbjKNpUUyXL4RIrDFwApmSB740yaePESJ3WzRjFe+NDk+jdU0f5X7JbkX17AdLLXjhLgzBkWd4QXxSQf/hSrp15taRos4yTnO22UcAyZoGRTh9IUJRnFDxGQkLUR/xjNLu/a5pXEn1muqgEbnAYmEp8kvn7zVCZFnfXrEAEsUJDdSAy08djw94BuHOzkJTymoy9EMd1lVk+7BaLUi8qvkFkb+1LG/+EoQ6RgThTDpVt7xkNjJx0qgLGrYB5cGsjcdhHxr7KPbN0Y9pCIGKOK/DSpK9Jub8WLLoE+nG1I0Com0Nmy+CfJ+RedjwUvm08fm4fYI4oTuD4NE6+fR4DY88Ye3gatTqaQj9VA9sonKbGAYHTBAigjAjC9prur1ksNYE63f1ilEUxQnNWIdIDZ2IDxefiJmwhGQVxeDSqlg+AqHM+iTC+xkSnyCKAmxRynFkVZ9M0vJ2QhQQiTM2+gDZcn1OIkNYzkigCv4Ew08ibG3ibxAVLiBqSKYHyRBi29nmD15EpHEtjSDCWNBjbKLDAf4X0cQnsqn5DsJ4f8zI/rL0DM16hbVHRQ1Z5qbZNaCi6UL+9EFeEolv1CpPRHiSFXDgyxnd5n94iNBzqSydzBCM/v4VE5GGY2B9jWbTQvosZdM72bMNkTBBLRREhDId34ohSM/NRYQdWSpofLWzAvUdhGScyAIMcRF9mOPUMB/dD92R4HfimNg+8wgdhl4yNOD+DdgGFxUYZ6sC4gskXnsO/hGEFBPodeowEjZlu4Ue2KY6DHs5ikYJj1BjztkkB8ezdCFnxo9AZE8iuFUGcZcsIvMnEDK9DiBoQilE35hBtr/vJCrcEk0HoSTGnSKs3TotJNDYnp2F9gMI2XI9GN/UUE1AQ+i0SQ8GUe6cscAhlPj0pqnesghPF4XlQHrhTyCk5nYBCZd0TQlyZpluOz4IojvsxJeyQXhqESKTpTc1K+NtCjeLRtbbjDFdkZpR70ntrOZ/h1geMKgEMq0GAVijnT1QtwnjZX3848Szx+MiMhdFnT1BGudsRoHvT/fk7CXLjqa+H3uZk3lx9X0Oe6ax1FwVmXl1b1EBM+uMjOL0GgeDZmJDCJJpCFAfbL2veGR/I0Nz65P0kVmHIBAEodhvsuNwJw9iW3M0s14kr/6ygAW5qo1idLNqvkPUcCOZ/xRw0dmLuP39Q7e/SmyYIMpK48Ld/aRlf6cfvJxoOAr0OhNsZEOpSmXF+PfOo/4u2WTUiA/BlFh3X/fpv7kHWOI0BIS32ccpmG5thsCziwV/j6heJztjrs5XoGp/8p/lU5p0QuIV7RkZ5BwXthv/zh7E/wDRbG9yllD3nBODJe15L0vZ65nYLkPgy/bwHTLzdBZcOL5kRyChPqc1dQTJTKQry2S/D3/o1wt2QFCyNz0aEXRxlO4zZOboHqwv7sjP5YsYFYXBYNOj/qHLMCQx36KWTOXbwBet35O+RNygJgjUI0STOqFEuLBV+oREoYx/DOIrzhq1EHBJjxDZXk+yUKRR35VqCLuN7vrfPirWZieXXnorFcD23RcgSpjFPTgSk1vmEr2339r3iMI22F/2cuRlQ+zsBOImySzVdUX8e76UQBp+ve+xwW14W/dX7oFFlGivtge20fPMbO5Q9snli8uYyOWSaOt06v5o2HGTkMI0BFVcxqJt3MD70rYk+8wN4AT1WrCjdZPm0PRWZQxoV1tnLierzD9d+87Q+DTvgJ68+KoF3w9fz2JmJMXYZLKFcRNy+JM+JqvwE+OIDEfI/ztSxWqv+jp+is08aqxxifVMcbnCzotJPnzyCFNFxkd+Pbw80Iksn3rTi62blBINwR0luKARU3MjZA+WaTb8sIYHMsJOac+2XgCEW3uC2LpJJxLGD1u5cKKaS+GOqIYh35+H9+sEIst2L6POadDt0e70YT1BbM/T2ZAWu+1Sw5IZpHbWXYDw07mt2t1SOnU9PRetrurojFkhOdTu3O5JM8q0MSVtrN6CKdiprMhdXRdE8Iv9PHNctSmHpDmqa19Wx+n1dfGanV6LpTYRN+3pUHaW/jOhzXBbRp1kbPnCCsXad4zqklYVxf6dmhCTU2sOOe1JNC/c8fcBtRqCClRe3Azy1q/A+q26sh8QXz9Wcblk8f0rgwePachOfprOKESuJQFXixFfFdz8gIoFVwPY5mXyrj8DnBefBR3FYc41c8edQGup2VMVSprh22PudHNL560beiYqsvuwU5HG+pZBtPmF3njTluGo91ku0o/rlMTLTOe0JtL50liTM+EL5Vye+jiHkAvKTFl1FL402sAz+HYopn7Oi/sofW9lOfwmF6Rl/IEhUyrTlLpWyKeO1/wqcSUfAnrQr1Aara59JxhrCNu6vY28QKgIWPpBmi+GjljyCcli7T1W1I0UQ+kFIlcuyGd1HcR6nYMR7p45r2BTrsvlbhaHw2G9kbSmVHdHjytOJuCbsKJu7IyvXiDiNrSWZFR4YkOsOjreDG9ZWqTk8a1lcYTDg/iMETMitNYxfpRl9jLiIA621AlA+knU8vHOef7scoQ1pVPa028DBXzVjH6sGx7ikukHLHfLOxYn55nygAg7OO8W9mpLYymC2znqx35rSocQClo1JWfddg6m+dm1u/OtJaQYcnhZXtkGXluZVizq1hdCSZHa15YHZnMg/eB3GztIiv3C1iu5YrXzr5qP2LA13doep9cm7DRjShWFufhbXwgrA4Prd67ag+JubxprSeDtd4eNZNcHesrGebPNl+ObdVYHU672Hra6XNEbwqpzOcE+WbfhQ0VffKqYc4c8rm6XWBC4b4SdoIzHbfpRtG7BzWdpsrc5RSoEF0uvf4TcAkPdghVfF9DUT58eyHIsbKPAQz4e4tN6Bb0ilCzMzxLOPa9/k+3PlB4vx/Mhn8ilhCuh8FD4OwiriSIEOaeZUOQOy+72RmW1awqW61DIU6vkFS+Ty63GVod6RthxVSsdv3EE3aeYjrxdPvItxtFa18S6ZVZHHk8NS/o9hFV3i+HD4GpPkoJtVduc9mlRFxyvea9MJnEwHkXzs+p0zQFkhCtRp0Klud9DeB0+9HPnOjUSWdi0ZUfV9Xo7oa5qsn2jVLdkacpSFMNjkoT5mwhrtdVRDt5TFeW6pNjuvCOcfHYM3a8irKu/jsSWDSajjXs/1H2DLDs8eJ2OKnetBvplhBWrovGgC9LbOtrD2oeE6kqPxmp8ZSQshRK6v41QQnJWdJtYyZ3joQ7o3z30B1mGrCunWzplZAvu/O8jbGIsXQcR5lKxnJ9dVWuKkFq1i29ZUIpUH25uhvYr/lzanXDFX0BYOxzG8Z5BmsRFuox2q/m/7fy0yqOjN71Rqpv0Se5e4fgbCGtt5p4eluF+gsY3d/n+FYQVWY60vHaDn6U4l2/vM/hDCJuBzI5fARlH1t2yFX8KoVSDHJ7zG/GJ+5SMV7b2IGz11xBKdQRNdi9R8VT1+HF+1j9Yd/mDCGtqAvqHvXdXak6CNF/X5veHNh47IOdvIWyoDujrWnZYRaN0XBT18UKFlx7z00Iaqteh/XtPWQX1OUNB/mc3ICHFqrW8XZ9fbdtmpf2vTnB9TEpzNPY3S4C+6U1vetOb3vSmN73pTW9605ve9KY3velNb3rT/zP9D/s451ylp9CIAAAAAElFTkSuQmCC'
// const IMAGE_PATH = '/public/logo.png'

export const masterDescriptionSlide: PptxGenJS.SlideMasterProps = {
  title: 'MASTER_DESCRIPTION_SLIDE',
  background: { color: 'FFFFFF' },
  objects: [
    {
      rect: {
        x: 0.0,
        y: 6.5,
        w: '100%',
        h: 0.75,
        fill: { color: 'F1F1F1' },
      },
    },
    {
      text: {
        text: `Author: Jimmy Rickardsson`,
        options: {
          x: startXPos,
          y: 6.5,
          w: 5.5,
          h: 0.75,
        },
      },
    },
    {
      // TODO fix w & h to be fixed inch values
      image: {
        x: toPercentage(remainingWidth(X_PADDING + LOGO_WIDTH + LOGO_MARGIN)),
        y: startYPos,
        w: toPercentage(LOGO_WIDTH), // It seems like we have to know the aspect ratio
        h: toPercentage(27), // It seems like we have to know the aspect ratio
        sizing: {
          type: 'contain',
          w: toPercentage(LOGO_WIDTH),
        },
        path: IMAGE_PATH,
      },
    },
  ],
}

export const descriptionTitle: PptxGenJS.TextPropsOptions = {
  x: startXPos,
  y: startYPos,
  fontSize: 36,
  w: toPercentage(remainingWidth(2 * X_PADDING + LOGO_WIDTH + LOGO_MARGIN)),
  h: 0.75,
  breakLine: true,
}
