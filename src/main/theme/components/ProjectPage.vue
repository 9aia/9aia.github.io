<template>
    <div class="ProjectPage">
        <slot />
    </div>
</template>
  
<style lang="scss" scoped>
.ProjectPage {
    padding-bottom: 96px;

    @media (min-width: 768px) {
        padding-bottom: 128px;
    }
}

:slotted(.ProjectPageSection + .ProjectPageSection),
:slotted(.Projects + .ProjectPageSection) {
    margin-top: 64px;
}
:slotted(.Projects + .Projects) {
    margin-top: 24px;
}

@media (min-width: 768px) {
    :slotted(.ProjectPageTitle + .ProjectPageSection) {
        margin-top: 16px;
    }
    :slotted(.ProjectPageSection + .ProjectPageSection),
    :slotted(.Projects + .ProjectPageSection) {
        margin-top: 96px;
    }
}

:slotted(.Projects) {
    padding: 0 24px;

    @media (min-width: 768px) {
        padding: 0 48px;
    }

    @media (min-width: 960px) {
        padding: 0 64px;
    }
}
</style>