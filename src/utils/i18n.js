// translate router.meta.title, be used in breadcrumb sidebar tagsview
export function generateTitle(title) {
  //暂不使用i18n语言
  /* const hasKey = this.$te('route.' + title)
  const translatedTitle = this.$t('route.' + title) // $t :this method from vue-i18n, inject in @/lang/index.js

  if (hasKey) {
    return translatedTitle
  } */
  return title
}
